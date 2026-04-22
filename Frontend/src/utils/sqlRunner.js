const normalizeWhitespace = (value) => value.replace(/\s+/g, " ").trim();

const splitCommaAware = (value) => {
  const parts = [];
  let current = "";
  let depth = 0;

  for (const char of value) {
    if (char === "(") depth += 1;
    if (char === ")") depth -= 1;

    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) parts.push(current.trim());
  return parts;
};

const compareRows = (actual, expected) =>
  JSON.stringify(actual) === JSON.stringify(expected);

const parseAlias = (expression) => {
  const aliasMatch = expression.match(/^(.*?)(?:\s+as\s+([a-zA-Z_][\w]*))$/i);

  if (!aliasMatch) {
    return { raw: expression.trim(), alias: null };
  }

  return {
    raw: aliasMatch[1].trim(),
    alias: aliasMatch[2].trim(),
  };
};

const evaluateSubquery = (query, rows, tableName) => {
  const cleaned = normalizeWhitespace(query);
  const match = cleaned.match(/^select max\((\w+)\) from (\w+)$/i);

  if (!match) {
    throw new Error("Only MAX subqueries are supported in this SQL playground.");
  }

  if (match[2].toLowerCase() !== tableName.toLowerCase()) {
    throw new Error("Subquery references an unknown table.");
  }

  const column = match[1];
  return Math.max(...rows.map((row) => Number(row[column])));
};

const applyWhere = (rows, whereClause, tableName) => {
  if (!whereClause) return rows;

  const match = normalizeWhitespace(whereClause).match(
    /^(\w+)\s*(=|>=|<=|>|<)\s*(.+)$/i
  );

  if (!match) {
    throw new Error("Unsupported WHERE clause in this SQL playground.");
  }

  const [, column, operator, rawValue] = match;
  let value;

  if (rawValue.startsWith("(") && rawValue.endsWith(")")) {
    value = evaluateSubquery(rawValue.slice(1, -1), rows, tableName);
  } else if (/^-?\d+(\.\d+)?$/.test(rawValue)) {
    value = Number(rawValue);
  } else if (/^'.*'$/.test(rawValue) || /^".*"$/.test(rawValue)) {
    value = rawValue.slice(1, -1);
  } else {
    value = rawValue;
  }

  return rows.filter((row) => {
    const left = row[column];

    switch (operator) {
      case "=":
        return left === value;
      case ">":
        return left > value;
      case "<":
        return left < value;
      case ">=":
        return left >= value;
      case "<=":
        return left <= value;
      default:
        return false;
    }
  });
};

const executeGroupedQuery = (rows, selectClause, groupByClause) => {
  const groupColumn = groupByClause.trim();
  const expressions = splitCommaAware(selectClause).map(parseAlias);
  const groups = rows.reduce((accumulator, row) => {
    const key = row[groupColumn];
    accumulator[key] = accumulator[key] || [];
    accumulator[key].push(row);
    return accumulator;
  }, {});

  return Object.entries(groups).map(([key, groupRows]) => {
    const resultRow = {};

    expressions.forEach(({ raw, alias }) => {
      if (raw.toLowerCase() === groupColumn.toLowerCase()) {
        resultRow[alias || groupColumn] = key;
        return;
      }

      if (/^count\(\*\)$/i.test(raw)) {
        resultRow[alias || "count"] = groupRows.length;
        return;
      }

      throw new Error("Unsupported GROUP BY select expression.");
    });

    return resultRow;
  });
};

const executeUngroupedQuery = (rows, selectClause) => {
  const expressions = splitCommaAware(selectClause).map(parseAlias);
  const aggregateOnly = expressions.every(
    ({ raw }) => /^max\((\w+)\)$/i.test(raw)
  );

  if (aggregateOnly) {
    const resultRow = {};

    expressions.forEach(({ raw, alias }) => {
      const match = raw.match(/^max\((\w+)\)$/i);
      const column = match[1];
      resultRow[alias || `max_${column}`] = Math.max(
        ...rows.map((row) => Number(row[column]))
      );
    });

    return [resultRow];
  }

  return rows.map((row) => {
    const resultRow = {};

    expressions.forEach(({ raw, alias }) => {
      if (!Object.prototype.hasOwnProperty.call(row, raw)) {
        throw new Error(`Unknown column "${raw}" in SELECT clause.`);
      }

      resultRow[alias || raw] = row[raw];
    });

    return resultRow;
  });
};

export const executeSqlAgainstProblem = (problem, query) => {
  const cleaned = query.trim().replace(/;$/, "");

  if (!cleaned) {
    throw new Error("Write a query before running it.");
  }

  const normalized = normalizeWhitespace(cleaned);
  const match = normalized.match(
    /^select (.+?) from (\w+)(?: where (.+?))?(?: group by (.+?))?$/i
  );

  if (!match) {
    throw new Error(
      "This SQL playground currently supports SELECT, WHERE, GROUP BY, COUNT(*), and MAX()."
    );
  }

  const [, selectClause, tableName, whereClause, groupByClause] = match;

  if (tableName.toLowerCase() !== problem.schema.table.toLowerCase()) {
    throw new Error(`Unknown table "${tableName}".`);
  }

  const filteredRows = applyWhere(problem.schema.rows, whereClause, tableName);
  const result = groupByClause
    ? executeGroupedQuery(filteredRows, selectClause, groupByClause)
    : executeUngroupedQuery(filteredRows, selectClause);

  const passed = compareRows(result, problem.expectedResult);

  return {
    result,
    passed,
    expected: problem.expectedResult,
  };
};
