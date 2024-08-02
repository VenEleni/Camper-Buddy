const UserModel = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
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
    res.status(201).json({ message: "User created successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email " });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = user.generateJWT();
    res.status(200).json({ message: "Logged in successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};
