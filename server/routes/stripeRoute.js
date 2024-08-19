const express = require('express');
const router = express.Router();
const {createPaymentIntent } = require('../controllers/stripeController');

// router.post("/create-checkout-session", makePayment)
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;