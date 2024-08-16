const express = require("express");
const router = express.Router();
const {addToCart, fetchCart, removeFromCart} = require('../controllers/cartController')
const authorization = require('../middlewares/authUser')

router.get('/fetchCart',authorization, fetchCart)
router.post('/addToCart', authorization, addToCart)
router.post('/removeFromCart', authorization, removeFromCart)

module.exports = router;