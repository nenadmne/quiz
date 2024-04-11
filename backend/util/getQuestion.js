const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;
const collectionName = process.env.MONGODB_COLLECTION;

let usedQuestionId=[]

async function connectToMongoDB() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function getRandomQuestion() {
  try {
    const db = await connectToMongoDB();
    const collection = await db.collection(collectionName).find({}).toArray();
    const newCollection = collection.filter(item => !usedQuestionId.map(id => id.toString()).includes(item._id.toString()));
    const randomIndex = Math.floor(Math.random() * newCollection.length);
    const randomQuestion = newCollection[randomIndex];
    usedQuestionId.push(randomQuestion._id)
    return randomQuestion;
  } catch (error) {
    console.error("Error fetching random question from MongoDB:", error);
    throw error;
  }
}

function updateUsedQuestions() {
  usedQuestionId = []
}

module.exports = {
  getRandomQuestion,
  updateUsedQuestions
};
