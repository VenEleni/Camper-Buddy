const OrderModel = require("../models/orderSchema");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching orders" });
  }
};

exports.createNewOrder = async (req, res) => {
  const {products, address, phone, email, fullName, country, postalCode } = req.body;
  const userId = req.user.id;
  try {
    const newOrder = new OrderModel({
      user: userId,
      products: products,
      address: address,
      phone: phone,
      email: email,
      fullName: fullName,
      country: country,
      postalCode: postalCode
    });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ msg: "Error creating order" });
  }
};

exports.updateOrderById = async (req, res) => {
  const id = req.params.id;
  const { user, products, address, phone, email, fullName, country, postalCode } = req.body;
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { user, products, address, phone, email, fullName, country, postalCode },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ msg: "Error Updating Order" });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await OrderModel.find({ user: id });
    if (!orders) {
      res.status(404).json({ msg: "Orders not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching user's orders" });
  }
};
