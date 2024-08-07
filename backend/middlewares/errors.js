import ApiError from "../util/apiErrors.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal server error",
    success: false,
  };

  if (process.env.NODE_ENV.toLocaleUpperCase() === "DEVELOPMENT") {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
      error: err,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV.toLocaleUpperCase() === "PRODUCTION") {
    return res.status(error.statusCode).json({
      success: error.success,
      message: error.message,
    });
  }
};
