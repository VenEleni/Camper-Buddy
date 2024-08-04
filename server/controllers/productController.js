const ProductModel = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const users = await ProductModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.createNewProduct = async (req, res) => {
  const {
    title,
    description,
    price,
    image,
    category,
    subcategory,
    sku,
    stock,
  } = req.body;
  const newProduct = new ProductModel({
    title,
    description,
    price,
    image,
    category,
    subcategory,
    sku,
    stock,
  });
  try {
    const saveNewProduct = await newProduct.save();
    res.status(200).json(saveNewProduct);
  } catch {
    res.status(500).json({ message: "Error creating new product" });
  }
};

exports.getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

exports.deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    if (!deleteProduct) {
      res.status(404).json({ msg: "product not found" });
    }
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(500).json({ msg: "Error deleting product" });
  }
};

exports.updateProductById = async (req, res) => {
  const id = req.params.id;
  const {
    title,
    description,
    price,
    image,
    category,
    subcategory,
    sku,
    stock,
  } = req.body;
  try {
    const updateProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          price,
          image,
          category,
          subcategory,
          sku,
          stock,
        },
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ msg: "Error updating product" });
  }
};
