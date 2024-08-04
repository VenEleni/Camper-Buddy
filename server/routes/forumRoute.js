const express = require("express");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const {authAdmin, authUser} = require("../middlewares")
const {getAllForum, getForumById, updateForumById, createForum} = require('../controllers/forumController')


router.get('/getallforums', getAllForum);
router.get('/getforum/:id',authAdmin, authUser, getForumById);
router.post('/createforum',authUser, createForum);
router.put('/updateforum/:id',authUser, updateForumById);

module.exports = router;