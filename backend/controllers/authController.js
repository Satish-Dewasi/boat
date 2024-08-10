import User from "../models/userModel.js";
import ApiError from "../util/apiErrors.js";
import { asyncHandler } from "../util/asyncHandler.js";
import sendToken from "../util/sendToken.js";
import { getResetPasswordTemplate } from "../util/emailTemplate.js";
import sendEmail from "../util/sendEMail.js";
import crypto from "crypto";
import { log } from "console";

// Register user   =>  /api/v1/register
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 200, res);
});

// Login user   =>  /api/v1/login
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError("Please enter email & password", 400));
  }

  // Find user in the database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ApiError("User not found. Register please", 401));
  }

  // Check if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ApiError("Wrong password", 401));
  }

  sendToken(user, 200, res);
});

// Logout user   =>  /api/v1/logout
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged Out",
  });
});

// // Forgot password   =>  /api/v1/password/forgot
export const forgotPassword = asyncHandler(async (req, res, next) => {
  // Find user in the database
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ApiError("User not found with this email", 404));
  }

  // Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save();

  // Create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Boat Password Recovery",
      message,
    });

    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ApiError(error?.message, 500));
  }
});

// Reset password   =>  /api/v1/password/reset/:token
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Hash the URL Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ApiError(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ApiError("Passwords does not match", 400));
  }

  // Set the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});


// get user profile =>  /api/v1/profile
export const getUserProfile= asyncHandler(async (req, res, next) =>{
    const user = await User.findById(req?.user?._id);
    
    res.status(200).json({
      user,
    })
}) 


// Update Password => /api/v1/password/update
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("+password");
  
  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new ApiError("Old password and new password are required", 400));
  }

  const isPasswordMatched = await user.comparePassword(oldPassword);

  if (!isPasswordMatched) {
    return next(new ApiError("Old password is incorrect", 400));
  }

  user.password = newPassword;

  try {
    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
      user,
    });
  } catch (error) {
    return next(new ApiError("Failed to update password", 500));
  }
});


// Update user Profile => /api/v1/profile/update
export const updateProfile = asyncHandler(async (req, res, next) => {

     const newUserData = { name : req.body.name,email : req.body.email, };

     const user = await User.findByIdAndUpdate(req.user._id, newUserData, {new: true});

     res.status(200).json({
      message: "Profile updated successfully",
      user,
     })

});


// Get all User ADMIN => /api/v1/admin/users
export const getAllUsers = asyncHandler(async (req, res, next) => {

  const users = await User.find();

  res.status(200).json({
    success: true,
   message: "All users fatched succcessfully",
   users,
  })

});


// Get User Details ADMIN => /api/v1/admin/users/:id
export const getUserDetails = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ApiError(`User not found with this ID - ${req.params.id}`));
  }
  
  res.status(200).json({
   success: true,
   message: "User details fatched succcessfully",
   user,
  })

});


// update User Details ADMIN => /api/v1/admin/users/:id
export const updateUserDetails = asyncHandler(async (req, res, next) => {

  const newUserData = {
     name : req.body.name,
     email : req.body.email,
     role : req.body.role,
    };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {new:true});

  
  res.status(200).json({
   success: true,
   message: "User updated fatched succcessfully",
   user,
  })

});

// delete User ADMIN => /api/v1/admin/users/:id
export const DeleteUser = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ApiError(`User not found with this ID - ${req.params.id}`));
  }

  await User.deleteOne();

  // remove user avatar from cloudnary
  
  res.status(200).json({
   success: true,
   message: "User Deleted succcessfully",
  })

});
