const express = require("express");
const router = express.Router();
const {addToCart, fetchCart, removeFromCart, reduceQuantity, increaseQuantity, clearCart} = require('../controllers/cartController')
const authorization = require('../middlewares/authUser')

router.get('/fetchCart',authorization, fetchCart)
router.post('/addToCart', authorization, addToCart)
router.post('/removeFromCart', authorization, removeFromCart)
router.post('/reduceQuantity', authorization, reduceQuantity)
router.post('/increaseQuantity', authorization, increaseQuantity)
router.delete('/clearCart',authorization, clearCart);

module.exports = router;