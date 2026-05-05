const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ================= MIDDLEWARE =================

// ✅ CORS (allow frontend)
app.use(cors({
  origin: "*", // later replace with your Netlify URL
}));

// ✅ JSON parser
app.use(express.json());

// ================= STATIC FILES =================

// For PDFs / uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= ROUTES =================

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// ================= ROOT ROUTE =================

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ================= DATABASE =================

// ❌ DON'T use localhost in production
// ✅ Use environment variable instead

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});