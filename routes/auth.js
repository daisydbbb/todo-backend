// define API endpoints
// In server.js, app.use("/xxx")
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// register new users, save to User db
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // handle missing information
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message:
          "This Email already registered! Please login or use a different email.",
      });
    }
    // save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // create JWT
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // success response
    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in registration: ", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // handle missing information
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    // generate JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // success response
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in login: ", error);
    res.status(500), json({ message: "Server error during login." });
  }
});

module.exports = router;
