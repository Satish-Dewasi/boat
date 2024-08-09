import {
  deleteProduct,
  getProduct,
  getProductDetails,
  newProduct,
  searchProduct,
  updateProductDetails,
} from "../controllers/productController.js";
import express from "express";
import { isAuthenticatedUser } from "../middlewares/userAuthencation.js";

const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getProduct);
router.route("/admin/products").post(newProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/products/:id").put(updateProductDetails);
router.route("/products/:id").delete(deleteProduct);
router.route("/product/search").get(searchProduct);

export default router;
