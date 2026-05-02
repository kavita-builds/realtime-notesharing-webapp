const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const User = require("../models/User");
const Note = require("../models/Note");

// ================= USERS =================

// 👉 Get all users
router.get("/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// 👉 Delete user
router.delete("/users/:id", auth, admin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});


// ================= NOTES =================

// 👉 Get all notes
router.get("/notes", auth, admin, async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "name email");
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// 👉 Delete note
router.delete("/notes/:id", auth, admin, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;