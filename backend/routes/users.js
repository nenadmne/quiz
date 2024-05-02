const express = require("express");
const { sign } = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

// Route for user signup
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  try {
    // Check if username already exists
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ username: username });
    if (existingUser) {
      return res.status(422).json({
        success: false,
        message: "Username already exists. Please choose a different username.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user into the collection
    const result = await usersCollection.insertOne({
      username: username,
      email: email,
      password: hashedPassword,
      role: "user",
    });

    // Generate JWT token
    const KEY = "supersecret";
    const token = sign({ username: username }, KEY, { expiresIn: "1h" });

    client.close();
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
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({ username: username });

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
    const token = sign({ username: username }, KEY, { expiresIn: "1h" });

    client.close();
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token: token,
      role: existingUser.role,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Login failed." });
  }
});

router.get("/users", async (req, res) => {
  try {
    // Extract users from mongoDb collection
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();
    // If users doesn't exist
    if (!users) {
      return res.status(422).json({
        success: false,
        message: "Entered user doesn't exist.",
      });
    }
    await client.close();
    return res.status(200).json({
      success: true,
      message: "Users fetched!",
      users,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Login failed." });
  }
});

module.exports = router;
