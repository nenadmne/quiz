const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://cosovicnenad14:arsenal95@cluster0.0rzttmk.mongodb.net/quiz?retryWrites=true&w=majority";
const dbName = "quiz"; // Your database name
const collectionName = "questions"; // Your collection name

async function connectToMongoDB() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
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
