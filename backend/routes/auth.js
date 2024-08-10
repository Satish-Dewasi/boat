import express from "express";
import {
  forgotPassword,
  getAllUsers,
  getUserDetails,
  getUserProfile,
  loginUser,
  logout,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserDetails,
  DeleteUser
} from "../controllers/authController.js";
import { authorizeRole, isAuthenticatedUser } from "../middlewares/userAuthencation.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);


router.route("/profile").get(isAuthenticatedUser, getUserProfile);
router.route("/profile/update").put(isAuthenticatedUser, updateProfile);

// get all ussers 
router.route("/admin/users").get(isAuthenticatedUser, authorizeRole('admin'), getAllUsers);
router.route("/admin/users/:id")
.get(isAuthenticatedUser, authorizeRole('admin'), getUserDetails)
.put(isAuthenticatedUser, authorizeRole('admin'), updateUserDetails)
.delete(isAuthenticatedUser, authorizeRole('admin'), DeleteUser);

export default router;
