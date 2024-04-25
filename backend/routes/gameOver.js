const express = require("express");
require("dotenv").config();

const router = express.Router();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

router.post("/gameOver", async (req, res) => {
  const room = req.body.room;
  const winner = req.body.winner;
  const draw = req.body.draw;

  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();

    const usersCollection = db.collection("users");
    const matchCollection = db.collection("match_history");

    const match = await matchCollection.findOne({ room: room });
    const { player1, player2 } = match;

    if (winner) {
      const resultMessage = `Player ${winner.name} won`;
      await matchCollection.updateOne(
        { room: room },
        { $set: { result: resultMessage } }
      );
      const playerWon = await usersCollection.findOne({
        username: winner.name,
      });
      const [playerLost] = [player1, player2].filter(
        (player) => player !== winner.name
      );
      const playerLoss = await usersCollection.findOne({
        username: playerLost,
      });

      await usersCollection.updateOne(
        { username: playerWon.username, win: { $exists: false } }, // Check if 'win' property doesn't exist
        { $set: { win: 0 } } // Set 'win' to 1 if it doesn't exist
      );

      // Increment 'win' property if it already exists
      await usersCollection.updateOne(
        { username: playerWon.username, win: { $exists: true } }, // Check if 'win' property exists
        { $inc: { win: 1 }, $set: { totalPoints: totalPointsPlayerWon } }
      );

      await usersCollection.updateOne(
        { username: playerLoss.username, loss: { $exists: false } },
        { $set: { loss: 0 } }
      );

      await usersCollection.updateOne(
        { username: playerLoss.username, loss: { $exists: true } },
        { $inc: { loss: 1 }, $set: { totalPoints: totalPointsPlayerLoss } }
      );
      await client.close();
    } else if (draw) {
      const resultMessage = `Draw`;
      await matchCollection.updateOne(
        { room: room },
        { $set: { result: resultMessage } }
      );

      const playerOne = await usersCollection.findOne({
        username: player1,
      });
      const playerTwo = await usersCollection.findOne({
        username: player2,
      });

      await usersCollection.updateOne(
        { username: playerOne.username, draw: { $exists: false } },
        { $set: { draw: 0 } }
      );
      await usersCollection.updateOne(
        { username: playerOne.username, draw: { $exists: true } },
        { $inc: { draw: 1 }, $set: { totalPoints: totalPointsPlayerOne } }
      );

      await usersCollection.updateOne(
        { username: playerTwo.username, draw: { $exists: false } },
        { $set: { draw: 0 } }
      );
      await usersCollection.updateOne(
        { username: playerTwo.username, draw: { $exists: true } },
        { $inc: { draw: 1 }, $set: { totalPoints: totalPointsPlayerTwo } }
      );
      await client.close();
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
