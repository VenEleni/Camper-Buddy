const express = require("express");
const router = express.Router();
const {getAllBlogs, getBlogById, deleteBlogById, createBlog, updateBlogById} = require("../controllers/blogController")
const {authAdmin, authUser} = require("../middlewares")

router.get('/getblogs', getAllBlogs);
router.get('/getblog/:id',authAdmin, getBlogById);
router.post('/createblog',authAdmin, createBlog );
router.delete('/deleteblog/:id', authAdmin, deleteBlogById);
router.put('/updateblog/:id',authAdmin, updateBlogById );

module.exports = router;