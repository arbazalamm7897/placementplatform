import pdfParse from "pdf-parse";
import InterviewSession from "../models/InterviewSession.js";

export const uploadResumeAndStartInterview = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Resume not uploaded" });
    }

    const pdfData = await pdfParse(req.file.buffer);

    const session = await InterviewSession.create({
      userId: req.body.userId,
      resumeText: pdfData.text,
    });

    res.json({
      sessionId: session._id,
      message: "Interview started",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start interview" });
  }
};
