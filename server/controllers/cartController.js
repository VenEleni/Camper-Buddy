const User = require("../models/userModel");
const Product = require("../models/productModel");

exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  console.log("userId and productId from addToCart Controller: ",userId, productId );
  console.log("req.body from addToCart Controller: ",req.body );
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user || !product) {
      return res.status(404).json({ message: "User or product not found" });
    }
    const cartItem = user.cart.find(
      (item) => item.productId === productId
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

exports.fetchCart = async (req, res) => {
  console.log( "req.params is : ",req.params.id);
    const userId = req.params.id;
    // console.log( "req is : ",req);
    console.log( "user is : ",req.user);
    
    try {
        const user = await User.findById(req.user.id).populate('cart.product');
        res.status(200).json({ cart: user.cart });
}catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
}
}
