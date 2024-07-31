import { getProduct } from "../controllers/productController.js";
import express from "express";

const router = express.Router();

router.route("/products").get(getProduct);

export default router;
