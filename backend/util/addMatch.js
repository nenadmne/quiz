const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;
const collectionName = "match_history";

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

async function addMatch({ players }, room) {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection(collectionName);

    const result = await collection.insertOne({
      player1: players[0].name,
      player2: players[1].name,
      room: room,
    });
    return result;
  } catch (error) {
    console.error("Error fetching random question from MongoDB:", error);
    throw error;
  }
}

module.exports = {
  addMatch,
};
