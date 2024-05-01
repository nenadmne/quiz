const express = require("express");
require("dotenv").config();

const router = express.Router();
const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGODB_URI;
const collection = process.env.MONGODB_COLLECTION;

router.post("/addQuestion", async (req, res) => {
  const questionData = req.body.questionData;

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const questionCollection = db.collection(collection);

    // Insert the question data into the questions collection
    await questionCollection.insertOne(questionData);
    res.status(200).json({ message: "Question added successfully" });
    await client.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post("/suggestQuestion", async (req, res) => {
  const questionData = req.body.questionData;

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const questionCollection = db.collection("suggested_questions");

    // Insert the question data into the questions collection
    await questionCollection.insertOne(questionData);
    await client.close();
    res.status(200).json({ message: "Question suggested successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.get("/recievedQuestions", async (req, res) => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const questionCollection = db.collection("suggested_questions");
    const questions = await questionCollection.find({}).toArray();

    await client.close();
    res
      .status(200)
      .json({ message: "Question suggested successfully", questions });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.delete("/deleteQuestion/:id", async (req, res) => {
  const questionId = req.params.id;
  const objectId = new ObjectId(questionId);

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    const questionCollection = db.collection("suggested_questions");
    // Delete the question from the questions collection
    await questionCollection.deleteOne({ _id: objectId });
    await client.close();
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Delete question: An error occurred" });
  }
});

module.exports = router;