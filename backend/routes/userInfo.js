const express = require("express");
require("dotenv").config();
const verifyToken = require("../auth/verify");

const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

router.get("/userInfo", verifyToken, async (req, res) => {
  const username = req.user.username;

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ username: username });

    await client.close();

    res.json(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
