const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// Register Controller
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;

    // Validation
    if (!username || !password || !email || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    // Hashing Password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
      address,
      phone,
      answer,
    });

    res.status(201).send({
      success: true,
      message: "Successfully registered",
      user: newUser,
    });
  } catch (error) {
    console.log("Error in registerController:", error);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      error,
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Check user password | Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined; // Hide password

    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("Error in loginController:", error);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
