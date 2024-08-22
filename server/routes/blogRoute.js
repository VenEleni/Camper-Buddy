const express = require("express");
const router = express.Router();
const {getAllBlogs, getBlogById, deleteBlogById, createBlog, updateBlogById} = require("../controllers/blogController")
const authUser = require("../middlewares/authUser.js")
const authAdmin = require("../middlewares/authAdmin.js")

router.get('/getblogs', getAllBlogs);
router.get('/getblog/:id', getBlogById);
router.post('/createblog',authUser, authAdmin, createBlog );
router.delete('/deleteblog/:id',authUser, authAdmin, deleteBlogById);
router.put('/updateblog/:id',authAdmin, updateBlogById );

module.exports = router;