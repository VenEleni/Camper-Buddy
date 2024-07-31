const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.register = async (req, res) => {
    console.log ("req.body is : " , req.body)
  const { username, email, password, role } = req.body;
  try {
    console.log("hey i'm inside the try")
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
    console.log("User before saving:", user);
    user.password = await bcrypt.hash(password, 10);
    try {
        await user.save();
        console.log("User saved successfully");
      } catch (saveError) {
        console.error("Error saving user:", saveError);
        return res.status(500).json({ message: "Error saving user" });
      }
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Logged in successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
