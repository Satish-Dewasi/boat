import {
  deleteProduct,
  getProduct,
  getProductDetails,
  newProduct,
  searchProduct,
  updateProductDetails,
} from "../controllers/productController.js";
import express from "express";
import {
  authorizeRole,
  isAuthenticatedUser,
} from "../middlewares/userAuthencation.js";

const router = express.Router();

router.route("/products").get(getProduct);
router.route("/product/search").get(searchProduct);
router.route("/products/:id").get(getProductDetails);

// update
router
  .route("/admin/products/:id")
  .put(
    isAuthenticatedUser,
    authorizeRole("admin", "customer"),
    updateProductDetails
  );

//delete
router
  .route("/admin/products/:id")
  .delete(
    isAuthenticatedUser,
    authorizeRole("admin", "customer"),
    deleteProduct
  );

//create
router
  .route("/admin/products")
  .post(isAuthenticatedUser, authorizeRole("admin", "customer"), newProduct);

export default router;
