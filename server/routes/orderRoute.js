const express = require("express");
const { get } = require("mongoose");
const router = express.Router();
const {authAdmin, authUser} = require("../middlewares")
const {getAllOrders, createNewOrder, updateOrderById, getOrdersByUserId} = require("../controllers/orderController")

router.get('/getallorders',authAdmin, getAllOrders);
router.get('/getorders/:user_id',authAdmin, getOrdersByUserId);
router.post('/neworder', authUser, createNewOrder );
router.put('/updateorder/:id',authAdmin, updateOrderById)

module.exports = router; 