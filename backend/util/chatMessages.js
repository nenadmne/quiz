const express = require("express");
require("dotenv").config();

const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

router.post("/chatMessage", async (req, res) => {
  const chatMessage = req.body.chatMessage;
  console.log(questionData);

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const questionCollection = db.collection("chat");

    // Insert the question data into the questions collection
    await questionCollection.insertOne(chatMessage);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
