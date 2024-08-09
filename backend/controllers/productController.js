import Product from "../models/productModel.js";
import ApiError from "../util/apiErrors.js";
import APIFilters from "../util/apiFilters.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { validateProduct } from "../util/productValidator.js";
import mongoose from "mongoose";

//get all products /api/v1/products
export const getProduct = asyncHandler(async (req, res) => {
  const resPerPage = 4;
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  console.log(req?.user);

  let products = await apiFilters.query;
  let filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    filteredProductsCount,
    products,
  });
});

// create new product /api/v1/admin/products
export const newProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    message: "product created successfully",
    product,
  });
});

// get single product /api/v1/products/:id
export const getProductDetails = asyncHandler(async (req, res, next) => {
  try {
    const id = req?.params?.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError("Invalid product ID format", 400));
    }

    const product = await Product.findById(id);

    if (!product) {
      return next(new ApiError("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "Product found",
      product,
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
});

// update product /api/v1/products/:id
export const updateProductDetails = asyncHandler(async (req, res, next) => {
  try {
    const id = req?.params?.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new APIFilters("Invalid product ID format", 400));
    }

    let product = await Product.findById(id);

    if (!product) {
      return next(new ApiError("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: "updated successfully",
      product,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
});

// delete product /api/v1/products/:id
export const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const id = req?.params?.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError("Invalid ID format", 401));
    }

    let product = await Product.findById(id);

    if (!product) {
      return next(new ApiError("Product not found", 404));
    }

    product = await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
});

// search api /api/v1/products/search
export const searchProduct = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json({
      keyword: req.query.keyword,
    });
  } catch (error) {
    return next(new APIFilters(error.message, 500));
  }
});
