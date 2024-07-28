const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
