import { useState } from "react";
import { UploadCloud, FileText, Star, AlertCircle } from "lucide-react";
import jsPDF from "jspdf";
import { analyzeResume as analyzeResumeRequest } from "../services/api";
import { recordResumeAnalysis } from "../utils/progressTracker";

const ResumeAnalyzer = () => {
  const [resume, setResume] = useState(null);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setError("");
    setScore(null);
    setFeedback([]);
    setResume(file);
  };

  const handleDownloadPDF = () => {
    if (!resume || score === null) return;

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = 40;
    let y = 40;

    doc.setFillColor(34, 139, 34);
    doc.rect(0, 0, pageWidth, 50, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("Resume Analysis Report", pageWidth / 2, 30, { align: "center" });

    y += 30;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`File: ${resume.name}`, leftMargin, y);
    y += 20;

    doc.setFontSize(14);
    doc.text("Overall Score:", leftMargin, y);
    const barWidth = (score / 10) * 200;
    doc.rect(leftMargin + 90, y - 10, 200, 10, "S");
    doc.setFillColor(34, 139, 34);
    doc.rect(leftMargin + 90, y - 10, barWidth, 10, "F");
    doc.setFontSize(12);
    doc.text(`${score}/10`, leftMargin + 300, y);
    y += 30;

    doc.setFontSize(14);
    doc.setTextColor(34, 139, 34);
    doc.text("Feedback Summary:", leftMargin, y);
    y += 15;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    feedback.forEach((item, idx) => {
      doc.setFillColor(200, 230, 201);
      doc.rect(leftMargin, y - 10, pageWidth - 80, 20, "F");
      doc.setTextColor(34, 139, 34);
      doc.setFontSize(12);
      doc.text(`${idx + 1}. ${item.title}`, leftMargin + 5, y + 5);
      y += 25;

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      const splitDesc = doc.splitTextToSize(item.desc, pageWidth - 80);
      doc.text(splitDesc, leftMargin + 10, y);
      y += splitDesc.length * 12 + 10;
    });

    doc.setTextColor(34, 139, 34);
    doc.setFontSize(12);
    doc.text("Thank you for using Resume Analyzer!", leftMargin, y + 20);

    doc.save("Resume_Report.pdf");
  };

  const analyzeResumeWithAI = async () => {
    if (!resume) return;

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setIsAnalyzing(true);
      setError("");

      const { data } = await analyzeResumeRequest(formData);
      setScore(data.score);
      setFeedback(data.feedback || []);
      await recordResumeAnalysis({
        fileName: resume.name,
        score: Number(data.score) || 0,
        feedbackCount: Array.isArray(data.feedback) ? data.feedback.length : 0,
      });
    } catch (err) {
      console.error("AI Resume Analysis Failed", err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.details ||
          err.message ||
          "AI Resume Analysis Failed"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Resume Analyzer
        </h1>
        <p className="text-gray-600 mb-12 text-lg">
          Upload your resume and let our AI analyze it for ATS compatibility,
          formatting, and keyword optimization.
        </p>

        <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition max-w-xl mx-auto">
          {!resume ? (
            <label
              htmlFor="resume-upload"
              className="flex flex-col items-center justify-center cursor-pointer space-y-4"
            >
              <UploadCloud className="w-14 h-14 text-green-600" />
              <p className="text-gray-700 font-medium">
                Drag and drop your resume here or{" "}
                <span className="text-green-700 underline">browse</span>
              </p>
              <input
                type="file"
                id="resume-upload"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="text-center space-y-4">
              <FileText className="w-14 h-14 text-green-600 mx-auto" />
              <p className="text-gray-700 font-medium">{resume.name}</p>
              <button
                onClick={analyzeResumeWithAI}
                disabled={isAnalyzing}
                className="mt-4 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-5 py-2 rounded-lg"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Resume with AI"}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-6 max-w-xl mx-auto rounded-xl bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {score !== null && (
          <div className="mt-16">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-yellow-500 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Resume Score:{" "}
                  <span className="text-green-700 font-bold">{score}/10</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {feedback.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-5 shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleDownloadPDF}
                className="mt-10 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition"
              >
                Download Detailed PDF Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
