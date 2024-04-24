const express = require("express");
require("dotenv").config();

const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

router.get("/leaderboards", async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();

    await client.close();

    res.json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
