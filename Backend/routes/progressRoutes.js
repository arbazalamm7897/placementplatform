import express from "express";
import auth from "../middleware/auth.js";
import {
  getProgress,
  resetProgress,
  trackProgressEvent,
} from "../controllers/progressController.js";

const router = express.Router();

router.get("/", auth, getProgress);
router.post("/track", auth, trackProgressEvent);
router.delete("/", auth, resetProgress);

export default router;
