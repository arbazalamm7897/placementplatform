import express from "express";
import multer from "multer";
import pdf from "pdf-parse";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);

    fs.unlinkSync(req.file.path); // delete temporary file

    res.json({ success: true, resumeText: pdfData.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Resume parsing failed" });
  }
});

export default router;
