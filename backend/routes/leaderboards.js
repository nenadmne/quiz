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
    const filteredUsers = users.filter((user) => user.role !== "administrator");

    for (const user of filteredUsers) {
      const { draw, win } = user;
      const totalPoints = draw * 1 + win * 3;

      // Update the user's document with the new totalPoints value
      await usersCollection.updateOne(
        { _id: user._id },
        { $set: { totalPoints } }
      );
    }

    await client.close();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      filteredUsers,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
