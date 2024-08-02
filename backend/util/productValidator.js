import Joi from "joi";

export const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().max(200).required().messages({
      "string.empty": "Please enter product name",
      "string.max": "Product name cannot exceed 200 characters",
      "any.required": "Please enter product name",
    }),

    price: Joi.number().integer().max(99999).required().messages({
      "number.base": "Product price must be a number",
      "number.max": "Product price cannot exceed 5 digits",
      "any.required": "Please enter product price",
    }),

    description: Joi.string().required().messages({
      "string.empty": "Please enter product description",
      "any.required": "Please enter product description",
    }),

    ratings: Joi.number().min(0).max(5).default(0).messages({
      "number.min": "Ratings cannot be less than 0",
      "number.max": "Ratings cannot be more than 5",
    }),

    images: Joi.array()
      .items(
        Joi.object({
          public_id: Joi.string().required().messages({
            "string.empty": "Image public_id is required",
          }),
          url: Joi.string().uri().required().messages({
            "string.empty": "Image URL is required",
            "string.uri": "Image URL must be a valid URI",
          }),
        })
      )
      .required()
      .messages({
        "array.base": "Images must be an array",
        "any.required": "Please provide product images",
      }),

    category: Joi.string()
      .valid(
        "earbuds",
        "neckbands",
        "wired headphones",
        "wireless headphones",
        "gaming headphones",
        "wired earphones",
        "speakers",
        "party speakers"
      )
      .required()
      .messages({
        "any.only": "Please select a valid product category",
        "any.required": "Please enter product category",
      }),

    color: Joi.string().required().messages({
      "string.empty": "Please enter the product color",
      "any.required": "Please enter the product color",
    }),

    stock: Joi.number().integer().required().messages({
      "number.base": "Product stock must be a number",
      "any.required": "Please enter product stock",
    }),

    numOfReviews: Joi.number().integer().default(0),

    reviews: Joi.array().items(
      Joi.object({
        user: Joi.string().hex().length(24).required().messages({
          "string.empty": "User ID is required",
          "string.hex": "User ID must be a valid hex string",
          "string.length": "User ID must be 24 characters long",
        }),
        rating: Joi.number().min(0).max(5).required().messages({
          "number.base": "Rating must be a number",
          "number.min": "Rating cannot be less than 0",
          "number.max": "Rating cannot be more than 5",
          "any.required": "Rating is required",
        }),
        comment: Joi.string().required().messages({
          "string.empty": "Review comment is required",
          "any.required": "Review comment is required",
        }),
      })
    ),

    seller: Joi.string().required().messages({
      "string.empty": "Please enter product seller",
      "any.required": "Please enter product seller",
    }),

    user: Joi.string().hex().length(24).optional().messages({
      "string.hex": "User ID must be a valid hex string",
      "string.length": "User ID must be 24 characters long",
    }),
  });

  return schema.validate(data);
};
