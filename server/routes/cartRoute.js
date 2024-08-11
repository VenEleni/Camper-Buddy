const express = require("express");
const router = express.Router();
const {addToCart, fetchCart} = require('../controllers/cartController')

router.get('/fetchCart', fetchCart)
router.post('/addToCart', addToCart)

module.exports = router;