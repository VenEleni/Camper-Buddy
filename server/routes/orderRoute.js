const express = require("express");
const router = express.Router();
const authorization = require('../middlewares/authUser')
const isAdminAuthorization = require('../middlewares/authAdmin')
const {getAllOrders, createNewOrder, updateOrderById, getOrdersByUserId} = require("../controllers/orderController")

router.get('/getallorders',authorization, isAdminAuthorization, getAllOrders);
router.get('/getorders/:user_id',authorization, isAdminAuthorization, getOrdersByUserId);
router.post('/neworder', authorization, createNewOrder );
router.put('/updateorder/:id',authorization, isAdminAuthorization, updateOrderById)

module.exports = router; 