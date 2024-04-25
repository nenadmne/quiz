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

    for (const user of users) {
      const { draw, win } = user;
      const totalPoints = draw * 1 + win * 3;

      // Update the user's document with the new totalPoints value
      await usersCollection.updateOne(
        { _id: user._id }, // Assuming _id is the unique identifier for users
        { $set: { totalPoints } }
      );
    }

    await client.close();

    res.json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
