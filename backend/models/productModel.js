import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },

    price: {
      type: Number,
      required: [true, "please enter product price"],
      maxLength: [200, "Product price cannot exceed 5 digits"],
    },

    descryption: {
      type: String,
      required: [true, "please enter product descryption"],
    },

    price: {
      type: Number,
      required: [true, "please enter product price"],
      maxLength: [200, "Product price cannot exceed 5 digits"],
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
      required: [true, "please enter product category"],
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
        message: "please select product category",
      },
    },

    color: {
      type: String,
      required: [true, "please enter the product color"],
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
