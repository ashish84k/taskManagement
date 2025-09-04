const { ValidationError } = require("sequelize");

const errorHandler = (err, req, res, next) => {
  console.error("🔥 Full Error Object:", err);

  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  if (err instanceof ValidationError) {
    statusCode = 400;
    message = "Database validation failed";
    errors = err.errors.map(e => ({
      field: e.path,
      message: e.message,
    }));
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};


module.exports = errorHandler;
