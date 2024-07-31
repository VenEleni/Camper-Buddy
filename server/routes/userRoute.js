const express = require("express");
const router = express.Router();
const {register, getAllUsers, login} = require("../controllers/userController")


router.get("/allusers", getAllUsers);
router.post("/register", register);
router.post("/login", login);

module.exports = router;