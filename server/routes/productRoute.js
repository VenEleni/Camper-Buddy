const express = require("express");
const router = express.Router();
const {getAllProducts, createNewProduct, getProductById, deleteProductById, updateProductById} =require("../controllers/productController")
const authorization = require('../middlewares/authUser')
const isAdminAuthorization = require('../middlewares/authAdmin')

router.get('/allproducts', getAllProducts);
router.get('/product/:id', getProductById);
router.post('/addproduct',authorization, isAdminAuthorization, createNewProduct);
router.delete('/deleteproduct:id',authorization, isAdminAuthorization, deleteProductById);
router.put('/updateProduct:id',authorization, isAdminAuthorization, updateProductById);

module.exports = router;