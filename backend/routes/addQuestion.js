const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://cosovicnenad14:arsenal95@cluster0.0rzttmk.mongodb.net/quiz?retryWrites=true&w=majority";

router.post("/addQuestion", async (req, res) => {
  const questionData = req.body.questionData;
  console.log(questionData)

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db();
    const questionCollection = db.collection("questions");

    // Insert the question data into the questions collection
    await questionCollection.insertOne(questionData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
