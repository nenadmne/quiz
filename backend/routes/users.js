const express = require("express");
const { sign } = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Connect to MongoDB
client.connect((err) => {
  if (err) {
    console.error("Error connecting to MongoDB:", err);
    return;
  }
  console.log("Connected to MongoDB");
});

// Database and collection names
const dbName = "quiz";
const collectionName = "users";

const db = client.db(dbName);
const collection = db.collection(collectionName);

// Route for user signup
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Check if username already exists
    const existingUser = await collection.findOne({ username: username });
    if (existingUser) {
      return res.status(422).json({
        success: false,
        message: "Username already exists. Please choose a different username.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user into the collection
    const result = await collection.insertOne({
      username: username,
      email: email,
      password: hashedPassword,
    });

    // Generate JWT token
    const KEY = "supersecret";
    const token = sign({ username: username }, KEY, { expiresIn: "8h" });

    return res.status(200).json({
      success: true,
      message: "Signup successful.",
      token: token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Signup failed." });
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Find the user by username in the MongoDB collection
    const existingUser = await collection.findOne({ username: username });

    // If user doesn't exist
    if (!existingUser) {
      return res.status(422).json({
        success: false,
        message: "Entered user doesn't exist.",
      });
    }

    // Compare hashed password
    const passwordValidation = await bcrypt.compare(
      password,
      existingUser.password
    );

    // If password is invalid
    if (!passwordValidation) {
      return res.status(422).json({
        message: "Invalid password.",
        errors: { credentials: "Entered password doesn't match." },
      });
    }

    // Generate JWT token
    const KEY = "supersecret";
    const token = sign({ username: username }, KEY, { expiresIn: "8h" });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Login failed." });
  }
});

module.exports = router;
