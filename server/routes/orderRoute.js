const express = require("express");
const { get } = require("mongoose");
const router = express.Router();

router.get('/getallorders');
router.get('/getorders/:user_id');
router.post('/neworder');
router.put('/updateorder/:id')

module.exports = router; 