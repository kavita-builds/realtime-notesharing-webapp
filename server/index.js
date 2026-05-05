const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Routes
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const adminRoutes = require("./routes/adminRoutes");



const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Static (PDF access)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// APIs
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// DB
mongoose.connect("mongodb://127.0.0.1:27017/notesapp")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});