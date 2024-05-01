const express = require("express");
require("dotenv").config();

const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

router.get("/matchHistory", async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const matchCollection = db.collection("match_history");
    const matches = await matchCollection.find({}).toArray();

    await client.close();
    res.status(200).json({
      success: true,
      message: "Successfully fetched games!",
      matches,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
