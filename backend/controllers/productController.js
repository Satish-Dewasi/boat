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
  // in userAuthentication middleware we asign user in req.user
  // that can be accesed here and can added in req.body
  req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    message: "product created successfully",
    product,
  });
});

// get products by category
export const getProductsByCategory = asyncHandler(async (req, res, next) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });

    if (!products) {
      return next(new ApiError("products not found with this category", 404));
    }

    res.status(200).json({
      success: true,
      message: `products with category ${category} `,
      noOfProducts: products.length,
      products,
    });
  } catch (error) {
    return next(new ApiError("Server Error", 500));
  }
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
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};

    const products = await Product.find({ ...keyword });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return next(new APIFilters(error.message, 500));
  }
});

// Create / update product reviews => /api/v1/reviews

export const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ApiError("Product not found with this ID", 404));
  }

  /* checking that is current user already gave review to this product or not , if we found review than have to update that one else have to create ne one  */

  const isReviewed = product.reviews?.find((r) => {
    r.user.toString() === req.user._id.toString();
  });

  if (isReviewed) {
    product.reviews?.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        r.comment = comment;
        r.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "review added",
  });
});

// get all reviews => /api/v1/reviews

export const getProductReviews = asyncHandler(async (req, res, next) => {
  console.log(req.query.id);

  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ApiError("Product not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    message: "reviews fatched",
    reviews: product.reviews,
  });
});

// Delete product review   =>  /api/v1/admin/reviews
export const deleteReview = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  const reviews = product?.reviews?.filter(
    (review) => review._id.toString() !== req?.query?.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, numOfReviews, ratings },
    { new: true }
  );

  res.status(200).json({
    success: true,
    product,
  });
});
