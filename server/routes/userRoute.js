const express = require("express");
const router = express.Router();
const {register, getAllUsers, login, getUserById} = require("../controllers/userController")


router.get("/allusers", getAllUsers);
router.post("/register",register);
router.post("/login", login);
router.get('/getuser/:id', getUserById)

module.exports = router;