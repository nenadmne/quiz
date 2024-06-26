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
    const matchCollection = db.collection("match_history");

    const user = await usersCollection.findOne({ username: username });

    const matches = await matchCollection
      .find({
        $or: [{ player1: username }, { player2: username }],
      })
      .toArray(); // Convert cursor to array

    await client.close();
    res.status(200).json({
      success: true,
      message: "User and his matches fetched successfully.",
      user,
      matches,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
