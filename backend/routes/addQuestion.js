const express = require("express");
require("dotenv").config(); 

const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI
const collection = process.env.MONGODB_COLLECTION

router.post("/addQuestion", async (req, res) => {
  const questionData = req.body.questionData;
  console.log(questionData);

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const questionCollection = db.collection(collection);

    // Insert the question data into the questions collection
    await questionCollection.insertOne(questionData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
