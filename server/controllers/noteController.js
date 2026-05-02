const Note = require("../models/Note");

// ================= GET ALL PUBLIC NOTES =================
exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ isPublic: true })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

// ================= GET SINGLE NOTE =================
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate("user", "name email");

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= CREATE TEXT NOTE =================
exports.createNote = async (req, res) => {
  try {
    const { title, description, content, tags } = req.body;

    const note = await Note.create({
      title,
      description,
      content,
      tags,
      user: req.user.id, // 🔥 REQUIRED
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
};

// ================= UPLOAD PDF NOTE =================
exports.uploadNote = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const note = await Note.create({
      title,
      description,
      tags: tags ? tags.split(",") : [],
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      user: req.user.id, // 🔥 REQUIRED
    });

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};

// ================= UPDATE NOTE =================
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 🔥 OWNER CHECK
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const { title, description, content } = req.body;

    note.title = title || note.title;
    note.description = description || note.description;
    note.content = content || note.content;

    await note.save();

    res.json(note);

  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// ================= DELETE NOTE =================
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 🔥 OWNER CHECK
    if (note.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await note.deleteOne();

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
};