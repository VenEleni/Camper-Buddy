const OrderModel = require("../models/orderSchema");
const sendEmail = require("../mailer");
const ProductModel = require("../models/productModel");

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
  const productIds = products.map(item => item.product);
  const fetchedProducts = await ProductModel.find({ _id: { $in: productIds } });

   const productMap = fetchedProducts.reduce((map, product) => {
    map[product._id.toString()] = product;
    return map;
  }, {});

  let total = 0;
  const orderProducts = products.map(item => {
    const product = productMap[item.product];
    if (!product) {
      throw new Error(`Product not found: ${item.product}`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.title}`);
    }
    total += product.price * item.quantity;
    return {
      product: item.product,
      quantity: item.quantity
    };
  });
  try {
    const newOrder = new OrderModel({
      user: userId,
      products: products,
      address: address,
      phone: phone,
      email: email,
      fullName: fullName,
      country: country,
      postalCode: postalCode,
      total: Number(total.toFixed(2)),
      products: orderProducts
    });
    await newOrder.save();
    await Promise.all(orderProducts.map(async (item) => {
      await ProductModel.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }));
    sendEmail(email, 'Order Confirmation', `inform you that your order has been placed successfully. Order ID: ${newOrder._id}!`);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ msg: "Error creating order" });
  }
};

exports.updateOrderById = async (req, res) => {
  const id = req.params.id;
  const { status } = req.body; 
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    console.log("updatedOrder is", updatedOrder);
    
    sendEmail(updatedOrder.email, 'Order Status Updated', `inform you that your order status has been updated to ${status}! `);
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
