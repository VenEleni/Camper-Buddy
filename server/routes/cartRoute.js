const express = require("express");
const router = express.Router();
const {addToCart, fetchCart, removeFromCart, reduceQuantity} = require('../controllers/cartController')
const authorization = require('../middlewares/authUser')

router.get('/fetchCart',authorization, fetchCart)
router.post('/addToCart', authorization, addToCart)
router.post('/removeFromCart', authorization, removeFromCart)
router.post('/reduceQuantity', authorization, reduceQuantity)


module.exports = router;