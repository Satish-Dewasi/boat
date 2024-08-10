import ApiError from "../util/apiErrors.js";

export default (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal server error",
    success: false,
  };

  // handling validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ApiError(message, 400);
  }

  // handling duplicate key
  if (err.code == 11000 ) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered `
    error = new ApiError(message, 400);
  }

  //handle wrong jsw 
  if (err.code == "JsonWebTokenError" ) {
    const message = `JSON web token is invalid. Try Again !!!`
    error = new ApiError(message, 400);
  }

   //handle expire jsw token
   if (err.code == "TokenExpireError" ) {
    const message = `Json web token is expired`
    error = new ApiError(message, 400);
  }


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
