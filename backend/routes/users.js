const express = require("express");
const { sign } = require("jsonwebtoken");
const router = express.Router();
const db = require("../data/store");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const data = [username, hashedPassword];

  try {
    let [existingUser] = await db.query(
      "SELECT id FROM players WHERE username = ?",
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(422).json({
        success: false,
        message: "Username already exists. Please choose a different username.",
      });
    }
    await db.query("INSERT INTO players (username, password) VALUES (?)", [
      data,
    ]);
    const KEY = "supersecret";
    const token = sign({ username: username }, KEY, { expiresIn: "8h" });
    return res.status(200).json({
      success: true,
      message: "Signup successful.",
      token: token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Signup failed." });
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    let [existingUser] = await db.query(
      "SELECT id FROM players WHERE username = ?",
      [username]
    );

    if (existingUser.length === 0) {
      return res.status(422).json({
        success: false,
        message: "Entered user doesnt exist.",
      });
    }

    const [storedPassword] = await db.query(
      "SELECT password FROM players WHERE username = ?",
      [username]
    );
    const hashedPassword = storedPassword[0].password;

    const passwordValidation = await bcrypt.compare(password, hashedPassword);

    if (!passwordValidation) {
      return res.status(422).json({
        message: "Invalid password.",
        errors: { credentials: "Entered password doesn't match." },
      });
    }
    const KEY = "supersecret";
    const token = sign({ username: username }, KEY, { expiresIn: "8h" });
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token: token,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ success: false, message: "Signup failed." });
  }
});

module.exports = router;
