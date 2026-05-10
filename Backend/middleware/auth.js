import jwt from "jsonwebtoken";
import { createError } from "../utils/appError.js";

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next(
      createError("No token, authorization denied", 401, {
        code: "AUTH_REQUIRED",
      })
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    next(
      createError("Token is not valid", 401, {
        code: "INVALID_TOKEN",
      })
    );
  }
};

export default auth;
