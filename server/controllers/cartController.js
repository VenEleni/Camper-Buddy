const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  console.log(
    "userId and productId from addToCart Controller: ",
    userId,
    productId
  );
  console.log("req.body from addToCart Controller: ", req.body);
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    }
    const cartItem = user.cart.find(
      (item) => item.product._id.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }
    await user.save();
    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

exports.increaseQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    }
    const cartItem = user.cart.find(
      (item) => item.product._id.toString() === productId
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cartItem.quantity += 1;
    await user.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

exports.reduceQuantity = async (req, res) => {
  const { userId, productId } = req.body;
  console.log(
    "userId and productId from removeFromCart Controller: ",
    userId,
    productId
  );
  console.log("req.body from removeFromCart Controller: ", req.body);
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    }
    const cartItem = user.cart.find(
      (item) => item.product._id.toString() === productId
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      user.cart = user.cart.filter(
        (item) => item.product._id.toString() !== productId
      );
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    } else {
      user.cart = user.cart.filter(
        (item) => item.product.toString() !== productId
      );
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.fetchCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate(
      "cart.product",
      "title price image"
    );
    res.status(200).json(user.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from the token by the middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = []; // Clear the cart
    await user.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart" });
  }
};

