import { AppError } from "../utils/appError.js";

export const notFoundHandler = (req, res, next) => {
  next(
    new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404, {
      code: "ROUTE_NOT_FOUND",
    })
  );
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const expose = err instanceof AppError ? err.expose : false;
  const payload = {
    error: expose ? err.message : "Internal server error",
  };

  if (err instanceof AppError && err.code) {
    payload.code = err.code;
  }

  if (err instanceof AppError && err.details !== undefined) {
    payload.details = err.details;
  } else if (!expose && process.env.NODE_ENV !== "production") {
    payload.details = err.message;
  }

  console.error(`[${req.method} ${req.originalUrl}]`, err);
  res.status(statusCode).json(payload);
};
