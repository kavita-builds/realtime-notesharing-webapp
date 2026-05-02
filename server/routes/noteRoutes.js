const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllNotes,
  getNoteById,
  deleteNote,
  uploadNote,
  createNote,
  updateNote,
} = require("../controllers/noteController");

// ===== PUBLIC =====
router.get("/all", getAllNotes);
router.get("/:id", getNoteById);

// ===== PROTECTED =====
router.post("/create", authMiddleware, createNote);
router.post("/upload", authMiddleware, upload.single("file"), uploadNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;