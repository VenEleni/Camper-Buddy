const express = require("express");
const router = express.Router();

router.get('/getallforums');
router.get('/getforum/:id');
router.post('/createforum');
router.put('/updateforum/:id')

module.exports = router;