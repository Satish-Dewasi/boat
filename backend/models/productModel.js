import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },

    price: {
      type: Number,
      required: [true, "Please enter product price"],
      validate: {
        validator: function (v) {
          return v.toString().length <= 5;
        },
        message: "Product price cannot exceed 5 digits",
      },
    },

    description: {
      type: String,
      required: [true, "Please enter product description"],
    },

    ratings: {
      type: Number,
      default: 0,
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: {
        values: [
          "earbuds",
          "neckbands",
          "wired headphones",
          "wireless headphones",
          "gaming headphones",
          "wired earphones",
          "speakers",
          "party speakers",
        ],
        message: "Please select a valid product category",
      },
    },

    color: {
      type: String,
      required: [true, "Please enter the product color"],
    },

    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],

    seller: {
      type: String,
      required: [true, "Please enter product seller"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
