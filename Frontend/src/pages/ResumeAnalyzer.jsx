import { useState } from "react";
import { UploadCloud, FileText, Star, AlertCircle } from "lucide-react";
import jsPDF from "jspdf";

const ResumeAnalyzer = () => {
  const [resume, setResume] = useState(null);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
    if (file) {
      // Simulated AI feedback
      setTimeout(() => {
        setScore(8.4);
        setFeedback([
          {
            title: "Add measurable impact",
            desc: "Use quantifiable results in your projects (e.g., 'Improved API response time by 30%').",
          },
          {
            title: "Include technical keywords",
            desc: "Mention skills like React, Node.js, MongoDB, and Express for software development roles.",
          },
          {
            title: "Formatting",
            desc: "Ensure consistent spacing and use one professional font throughout.",
          },
        ]);
      }, 1500);
    }
  };

  const handleDownloadPDF = () => {
    if (!resume) return;

    const doc = new jsPDF("p", "pt", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;
    const leftMargin = 40;

    // ✅ Header
    doc.setFillColor(34, 139, 34); // dark green
    doc.rect(0, 0, pageWidth, 50, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("Resume Analysis Report", pageWidth / 2, 30, { align: "center" });

    y += 30;

    // Resume File Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`File: ${resume.name}`, leftMargin, y);
    y += 20;

    // Score Section with bar
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Overall Score:", leftMargin, y);
    doc.setFillColor(34, 139, 34); // green bar
    const barWidth = (score / 10) * 200;
    doc.rect(leftMargin + 90, y - 10, 200, 10, "S"); // empty bar border
    doc.setFillColor(34, 139, 34);
    doc.rect(leftMargin + 90, y - 10, barWidth, 10, "F"); // filled bar
    doc.setFontSize(12);
    doc.text(`${score}/10`, leftMargin + 300, y);
    y += 30;

    // Feedback Section
    doc.setFontSize(14);
    doc.setTextColor(34, 139, 34);
    doc.text("Feedback Summary:", leftMargin, y);
    y += 15;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    feedback.forEach((item, idx) => {
      // Title with colored box
      doc.setFillColor(200, 230, 201); // light green background
      doc.rect(leftMargin, y - 10, pageWidth - 80, 20, "F");
      doc.setTextColor(34, 139, 34);
      doc.setFontSize(12);
      doc.text(`${idx + 1}. ${item.title}`, leftMargin + 5, y + 5);
      y += 25;

      // Description
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      const splitDesc = doc.splitTextToSize(item.desc, pageWidth - 80);
      doc.text(splitDesc, leftMargin + 10, y);
      y += splitDesc.length * 12 + 10;
    });

    // Footer
    doc.setTextColor(34, 139, 34);
    doc.setFontSize(12);
    doc.text(
      "Thank you for using Resume Analyzer!",
      leftMargin,
      y + 20
    );

    doc.save("Resume_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Resume Analyzer 📄
        </h1>
        <p className="text-gray-600 mb-12 text-lg">
          Upload your resume and let our AI analyze it for ATS compatibility, formatting, and keyword optimization.
        </p>

        {/* Upload Section */}
        <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition max-w-xl mx-auto">
          {!resume ? (
            <label
              htmlFor="resume-upload"
              className="flex flex-col items-center justify-center cursor-pointer space-y-4"
            >
              <UploadCloud className="w-14 h-14 text-green-600" />
              <p className="text-gray-700 font-medium">
                Drag & drop your resume here or{" "}
                <span className="text-green-700 underline">browse</span>
              </p>
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="text-center space-y-4">
              <FileText className="w-14 h-14 text-green-600 mx-auto" />
              <p className="text-gray-700 font-medium">{resume.name}</p>
              <p className="text-sm text-gray-500">
                Analyzing your resume... (mock data for demo)
              </p>
            </div>
          )}
        </div>

        {/* AI Feedback Section */}
        {score && (
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

              {/* ✅ PDF Download Button */}
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
