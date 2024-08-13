const express = require("express");
const router = express.Router();
const {addToCart, fetchCart} = require('../controllers/cartController')
const authorization = require('../middlewares/authUser')

router.get('/fetchCart',authorization, fetchCart)
router.post('/addToCart', authorization, addToCart)

module.exports = router;