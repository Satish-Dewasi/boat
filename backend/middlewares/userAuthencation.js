import ApiError from "../util/apiErrors.js";
import { asyncHandler } from "../util/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// check if user authenticated or not

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ApiError("Login first to access this resource", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  req.user = await User.findById(decoded.id);

  next();
});
