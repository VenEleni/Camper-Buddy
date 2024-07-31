const express = require("express");
const router = express.Router();

router.get('/allproducts');
router.get('/product/:id');
router.post('/addproduct');
router.delete('/deleteproduct:id');
router.put('/updateProduct:id');

module.exports = router;