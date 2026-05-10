import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { createError } from "../utils/appError.js";

const router = express.Router();

// Signup
router.post("/signup", asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw createError("name, email, and password are required", 400, {
      code: "SIGNUP_FIELDS_REQUIRED",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError("User already exists", 400, {
      code: "USER_ALREADY_EXISTS",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
}));

// Login
router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createError("email and password are required", 400, {
      code: "LOGIN_FIELDS_REQUIRED",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createError("User not found", 404, {
      code: "USER_NOT_FOUND",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createError("Invalid credentials", 401, {
      code: "INVALID_CREDENTIALS",
    });
  }

  const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
  });

  res.status(200).json({ message: "Login successful", token, user });
}));

export default router;
