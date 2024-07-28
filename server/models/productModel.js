const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Camping Tents", "Camping Essentials", "Accessories & Extras"],
    required: true,
  },
  subcategory: {
    type: String,
    enum: ["Winter Tents", "Summer Tents" , "4-Season Tents" , "Hammock Tents", "Shade Tents",
           "Sleeping Equipment", "Survival Supplies", "Lighting Products", "Cooking & Food Equipment",
           "Personal Care", "Backpacks", "Clothing", "Camping Furniture", "Other"
    ],
    required: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  reviews: [ReviewSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("Product", ProductSchema);
const Review = mongoose.model("Review", ReviewSchema);

module.exports = {Product, Review};

