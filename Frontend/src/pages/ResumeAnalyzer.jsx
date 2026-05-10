import { useState } from "react";
import { UploadCloud, FileText, Star, AlertCircle } from "lucide-react";
import jsPDF from "jspdf";
import {
  analyzeResume as analyzeResumeRequest,
  getApiErrorMessage,
} from "../services/api";
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
      setError(getApiErrorMessage(err, "AI Resume Analysis Failed"));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-content text-center">
        <div className="hero-panel">
          <p className="section-badge">Resume Intelligence</p>
          <h1 className="heading-lg mt-6">Premium AI feedback for a sharper first impression.</h1>
          <p className="body-lg mx-auto mt-4 max-w-3xl">
            Upload your resume and let our AI analyze it for ATS compatibility,
            formatting, and keyword optimization.
          </p>
        </div>

        <div className="glass-card mx-auto mt-8 max-w-2xl p-8 transition duration-500 hover:-translate-y-1">
          {!resume ? (
            <label
              htmlFor="resume-upload"
              className="flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-[28px] border border-dashed border-cyan-300/30 bg-white/5 p-8 transition hover:border-cyan-300/50 hover:bg-white/10"
            >
              <UploadCloud className="h-14 w-14 text-cyan-200" />
              <p className="text-lg font-medium text-white">
                Drag and drop your resume here or{" "}
                <span className="text-cyan-300 underline">browse</span>
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
              <FileText className="mx-auto h-14 w-14 text-cyan-200" />
              <p className="font-medium text-white">{resume.name}</p>
              <button
                onClick={analyzeResumeWithAI}
                disabled={isAnalyzing}
                className="primary-button mt-4"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Resume with AI"}
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        {score !== null && (
          <div className="mt-12">
            <div className="glass-card mx-auto max-w-4xl p-8">
              <div className="mb-6 flex items-center justify-center">
                <Star className="mr-2 h-8 w-8 text-amber-300" />
                <h2 className="text-2xl font-semibold text-white">
                  Resume Score:{" "}
                  <span className="font-bold text-cyan-300">{score}/10</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {feedback.map((item, idx) => (
                  <div
                    key={idx}
                    className="surface-muted rounded-3xl p-5 text-left transition hover:bg-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-cyan-200" />
                      <div>
                        <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-slate-300">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={handleDownloadPDF} className="secondary-button mt-10">
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
