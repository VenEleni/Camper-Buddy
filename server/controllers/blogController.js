const BlogModel = require("../models/blogModel");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
};

exports.deleteBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteBlog = await BlogModel.findByIdAndDelete(id);
    if (!deleteBlog) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.status(200).json(deleteBlog);
  } catch (error) {
    res.status(500).json({ msg: "Error deleting blog" });
  }
};

exports.createBlog = async (req, res) => {
  const { title, content, author, image } = req.body;
  try {
    const newBlog = new BlogModel({ title, content, author, image });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ msg: "Error creating blog" });
  }
};

exports.updateBlogById = async (req, res) => {
  const id = req.params.id;
  const { title, content, author, image } = req.body;
  try {
    const updateBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, author, image },
      { new: true }
    );
    if (!updateBlog) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.status(200).json(updateBlog);
  } catch (error) {
    res.status(500).json({ msg: "Error updating blog" });
  }
};
