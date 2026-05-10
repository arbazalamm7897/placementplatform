export class AppError extends Error {
  constructor(message, statusCode = 500, options = {}) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = options.code || null;
    this.details = options.details;
    this.expose = options.expose ?? statusCode < 500;
  }
}

export const createError = (message, statusCode = 500, options = {}) =>
  new AppError(message, statusCode, options);
