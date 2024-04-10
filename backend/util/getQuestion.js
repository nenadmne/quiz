const { MongoClient } = require("mongodb");
require("dotenv").config(); 

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_NAME
const collectionName = process.env.MONGODB_COLLECTION

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
  const db = await connectToMongoDB();
  const collection = db.collection(collectionName);
  try {
    const randomQuestion = await collection
      .aggregate([{ $sample: { size: 1 } }])
      .next();
    return randomQuestion;
  } catch (error) {
    console.error("Error fetching random question from MongoDB:", error);
    throw error;
  } finally {
    await db.client.close();
  }
}

module.exports = {
  getRandomQuestion,
};
