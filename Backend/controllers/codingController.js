import fs from "fs/promises";
import os from "os";
import path from "path";
import vm from "vm";
import { execFile } from "child_process";
import { promisify } from "util";
import { getDsaProblemById } from "../data/dsaProblems.js";

const execFileAsync = promisify(execFile);
const SUPPORTED_LANGUAGES = new Set(["javascript", "java"]);

const normalizeValue = (value) => JSON.parse(JSON.stringify(value));

const valuesEqual = (left, right) =>
  JSON.stringify(normalizeValue(left)) === JSON.stringify(normalizeValue(right));

const runJavascriptSolution = async (problem, code) => {
  const script = new vm.Script(
    `
${code}

if (typeof ${problem.functionName} !== "function") {
  throw new Error("Expected a function named ${problem.functionName}");
}

globalThis.__solution__ = ${problem.functionName};
`,
    { filename: `${problem.id}.js` }
  );

  const sandbox = {};
  vm.createContext(sandbox);
  script.runInContext(sandbox, { timeout: 1000 });

  const solution = sandbox.__solution__;

  if (typeof solution !== "function") {
    throw new Error("Solution function could not be loaded");
  }

  return problem.testCases.map((testCase, index) => {
    const actual = solution(...structuredClone(testCase.input));
    return {
      id: index + 1,
      input: testCase.input,
      expected: testCase.expected,
      actual,
      passed: valuesEqual(actual, testCase.expected),
    };
  });
};

const escapeJavaString = (value) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");

const toJavaLiteral = (value, type) => {
  if (type === "int") return String(value);
  if (type === "boolean") return value ? "true" : "false";
  if (type === "String") return `"${escapeJavaString(value)}"`;

  if (type === "int[]") {
    return `new int[]{${value.join(", ")}}`;
  }

  if (type === "List<Integer>") {
    if (!value.length) return "new ArrayList<>()";
    return `new ArrayList<>(Arrays.asList(${value.join(", ")}))`;
  }

  if (type === "List<List<Integer>>") {
    if (!value.length) return "new ArrayList<>()";
    const nested = value
      .map((item) =>
        item.length
          ? `new ArrayList<>(Arrays.asList(${item.join(", ")}))`
          : "new ArrayList<>()"
      )
      .join(", ");

    return `new ArrayList<>(Arrays.asList(${nested}))`;
  }

  throw new Error(`Unsupported Java literal type: ${type}`);
};

const javaSerializationHelper = `
  private static String toJson(Object value) {
    if (value == null) return "null";
    if (value instanceof int[]) {
      int[] arr = (int[]) value;
      StringBuilder sb = new StringBuilder("[");
      for (int i = 0; i < arr.length; i++) {
        if (i > 0) sb.append(",");
        sb.append(arr[i]);
      }
      sb.append("]");
      return sb.toString();
    }
    if (value instanceof List<?>) {
      List<?> list = (List<?>) value;
      StringBuilder sb = new StringBuilder("[");
      for (int i = 0; i < list.size(); i++) {
        if (i > 0) sb.append(",");
        sb.append(toJson(list.get(i)));
      }
      sb.append("]");
      return sb.toString();
    }
    if (value instanceof String) {
      return "\\\"" + ((String) value) + "\\\"";
    }
    return String.valueOf(value);
  }
`;

const buildJavaHarness = (problem) => {
  const cases = problem.testCases
    .map((testCase, index) => {
      const args = testCase.input
        .map((value, argIndex) => toJavaLiteral(value, problem.argTypes[argIndex]))
        .join(", ");
      return `outputs.add(toJson(solution.${problem.javaMethodName}(${args})));`;
    })
    .join("\n    ");

  return `
import java.util.*;

public class Main {
${javaSerializationHelper}

  public static void main(String[] args) {
    Solution solution = new Solution();
    List<String> outputs = new ArrayList<>();
    ${cases}
    System.out.print(String.join("\\n", outputs));
  }
}
`;
};

const runJavaSolution = async (problem, code) => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "coding-judge-"));
  const solutionPath = path.join(tempDir, "Solution.java");
  const mainPath = path.join(tempDir, "Main.java");

  try {
    await fs.writeFile(solutionPath, code, "utf8");
    await fs.writeFile(mainPath, buildJavaHarness(problem), "utf8");

    await execFileAsync("javac", ["Solution.java", "Main.java"], {
      cwd: tempDir,
      timeout: 5000,
    });

    const { stdout } = await execFileAsync("java", ["Main"], {
      cwd: tempDir,
      timeout: 5000,
    });

    const outputs = stdout.trim() ? stdout.trim().split(/\r?\n/) : [];

    return problem.testCases.map((testCase, index) => {
      const actual = outputs[index] ? JSON.parse(outputs[index]) : null;
      return {
        id: index + 1,
        input: testCase.input,
        expected: testCase.expected,
        actual,
        passed: valuesEqual(actual, testCase.expected),
      };
    });
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
};

export const runDsaCode = async (req, res) => {
  const { id } = req.params;
  const { code, language } = req.body;
  const normalizedLanguage = String(language || "").toLowerCase();
  const problem = getDsaProblemById(id);

  if (!problem) {
    return res.status(404).json({ error: "Problem not found" });
  }

  if (!SUPPORTED_LANGUAGES.has(normalizedLanguage)) {
    return res.status(400).json({
      error:
        "This judge currently supports JavaScript and Java execution. You can still use the editor templates for other languages.",
    });
  }

  if (!code?.trim()) {
    return res.status(400).json({ error: "Code is required" });
  }

  try {
    const results =
      normalizedLanguage === "java"
        ? await runJavaSolution(problem, code)
        : await runJavascriptSolution(problem, code);

    const passedCount = results.filter((result) => result.passed).length;

    res.json({
      language: normalizedLanguage,
      passedCount,
      totalCount: results.length,
      allPassed: passedCount === results.length,
      results,
    });
  } catch (error) {
    res.status(400).json({
      error: "Code execution failed",
      details: error.stderr || error.message,
    });
  }
};
