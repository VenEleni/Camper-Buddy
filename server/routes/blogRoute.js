const express = require("express");
const router = express.Router();

router.get('/getblogs');
router.get('/getblog/:id');
router.post('/createblog');
router.delete('/deleteblog/:id');
router.put('/updateblog/:id');

module.exports = router;