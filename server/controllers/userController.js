const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body; //should include role, even if it's not required.Before this, I tried to register as admin, and it returned the user but with a role as "user".
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = new UserModel({
      username,
      email,
      password,
      role
    });
    await user.save();
    const token = user.generateJWT();
    res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  console.log("req.body is : ", req.body);
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    console.log("user is: ", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email " });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("valid pass: ", isValidPassword);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = user.generateJWT();
    res.status(200).json({ message: "Logged in successfully", token: token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.getUserById = async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};



