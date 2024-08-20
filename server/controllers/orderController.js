const OrderModel = require("../models/orderSchema");
const sendEmail = require("../mailer");

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
    sendEmail(email, 'Order Confirmation', `Your order has been placed successfully. Order ID: ${newOrder._id}`);
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ msg: "Error creating order" });
  }
};

exports.updateOrderById = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body; // Only update the status
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    console.log("updatedOrder is", updatedOrder);
    
    sendEmail(updatedOrder.email, 'Order Status Updated', `Your order status has been updated to ${status}`);
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
