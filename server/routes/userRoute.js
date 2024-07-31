const express = require("express");
const router = express.Router();


router.get("/allusers");
router.post("/register");
router.post("/login");

module.exports = router;