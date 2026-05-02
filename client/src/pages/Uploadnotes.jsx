import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Uploadnotes() {
  const [mode, setMode] = useState("write");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState("");

  const handleUpload = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("❌ Please login first");
        return;
      }

      if (!title.trim()) {
        alert("Title is required");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIXED (COMMON FOR BOTH)
        },
      };

      // ================= WRITE MODE =================
      if (mode === "write") {
        if (!content.trim()) {
          alert("Content is required");
          return;
        }

        await axios.post(
          "http://localhost:5000/api/notes/create",
          {
            title,
            description,
            content,
            tags,
          },
          config
        );
      }

      // ================= UPLOAD MODE =================
      else {
        if (!file) {
          alert("Please select a PDF file");
          return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("tags", tags);
        formData.append("file", file);

        await axios.post(
          "http://localhost:5000/api/notes/upload",
          formData,
          {
            headers: {
              ...config.headers,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert("✅ Uploaded successfully");

      // 🔄 Reset
      setTitle("");
      setDescription("");
      setContent("");
      setFile(null);
      setTags("");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Upload failed");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="w-px bg-gray-300"></div>

      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">

        <Link
          to="/dashboard"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          ← Back
        </Link>

        <h1 className="text-2xl font-bold mt-4">Upload Notes</h1>
        <p className="text-gray-500">Add a new note</p>

        <div className="bg-white p-6 rounded-2xl shadow mt-6 max-w-3xl">

          {/* Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode("write")}
              className={`px-5 py-2 rounded ${
                mode === "write" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Write Notes
            </button>

            <button
              onClick={() => setMode("upload")}
              className={`px-5 py-2 rounded ${
                mode === "upload" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              Upload PDF
            </button>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-3 rounded-lg"
            />

            {mode === "write" ? (
              <textarea
                placeholder="Write your content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border p-3 rounded-lg h-40"
              />
            ) : (
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="border p-3 rounded-lg"
              />
            )}

            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="border p-3 rounded-lg"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                setTitle("");
                setDescription("");
                setContent("");
                setFile(null);
                setTags("");
              }}
              className="bg-gray-400 px-5 py-2 rounded text-white"
            >
              Cancel
            </button>

            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Upload
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Uploadnotes;