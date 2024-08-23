const ProductModel = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const users = await ProductModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
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
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
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

  console.log("req.body is : ", req.body);
  
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
    console.log("updateProduct is : ", updateProduct);
    
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({ msg: "Error updating product" });
  }
};

exports.filterProducts = async (req, res) => {
  const { category, subcategory } = req.query;
  console.log("req.query is : ", req.query);
  
  let filter = {};
  if (category) filter.category = category;
  if (subcategory) filter.subcategory = subcategory;
  try {
    const products = await ProductModel.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: "Error filtering products" });
  }
};
