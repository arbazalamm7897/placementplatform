import express from "express";
import { runDsaCode } from "../controllers/codingController.js";

const router = express.Router();

router.post("/dsa/:id/run", runDsaCode);

export default router;
