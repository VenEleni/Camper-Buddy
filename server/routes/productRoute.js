const express = require("express");
const router = express.Router();
const {getAllProducts, createNewProduct, getProductById, deleteProductById, updateProductById} =require("../controllers/productController")
const {authAdmin, authUser} = require("../middlewares")

router.get('/allproducts', getAllProducts);
router.get('/product/:id', getProductById);
router.post('/addproduct',authAdmin, createNewProduct);
router.delete('/deleteproduct:id',authAdmin, deleteProductById);
router.put('/updateProduct:id',authAdmin, updateProductById);

module.exports = router;