import Product from "../models/productModel.js";
import APIFilters from "../util/apiFilters.js";
import { validateProduct } from "../util/productValidator.js";
import mongoose from "mongoose";

//get all products /api/v1/products
export const getProduct = async (req, res) => {
  const resPerPage = 4;
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  let products = await apiFilters.query;
  let filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductsCount,
    products,
  });
};

// create new product /api/v1/admin/products
export const newProduct = async (req, res) => {
  const { error } = validateProduct(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    message: "product created successfully",
    product,
  });
};

// get single product /api/v1/products/:id
export const getProductDetails = async (req, res) => {
  try {
    const id = req?.params?.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "product found",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// update product /api/v1/products/:id
export const updateProductDetails = async (req, res) => {
  try {
    const id = req?.params?.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: "updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// delete product /api/v1/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const id = req?.params?.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    let product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product = await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// search api /api/v1/products/search
export const searchProduct = async (req, res) => {
  try {
    res.status(200).json({
      keyword: req.query.keyword,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
