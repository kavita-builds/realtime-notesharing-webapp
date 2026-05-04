import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);



  
  // 🔥 Decode user from token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserId(decoded.id);
      } catch (err) {
        console.log("Invalid token");
      }
    }

    fetchNotes();
  }, []);

  // 🔥 Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes/all");
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Delete note (with token)
const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/notes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ FIX
        },
      }
    );

    setNotes((prev) => prev.filter((note) => note._id !== id));

  } catch (err) {
    alert("Delete failed");
    console.log(err);
  }
};

  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">

        {/* 🔝 Top Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
          <input
            className="w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Search notes..."
          />

          <Link
            to="/Uploadnotes"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            + Upload Notes
          </Link>
        </div>

        {/* 👋 Welcome */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow">
          <h1 className="text-2xl font-bold">Welcome back 👋</h1>
          <p className="opacity-90">Total Notes: {notes.length}</p>
        </div>

        {/* ⏳ Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading notes...</p>
        )}

        {/* ❌ Empty State */}
        {!loading && notes.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No notes found</p>
          </div>
        )}

        {/* 📄 Notes List */}
        <div className="grid md:grid-cols-2 gap-4">

          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              {/* Title */}
              <h1 className="text-lg font-semibold text-gray-800">
                {note.title}
              </h1>

              {/* Description */}
              <p className="text-gray-500 text-sm mt-1">
                {note.description}
              </p>

              {/* Owner */}
              <p className="text-xs text-gray-400 mt-2">
                By: {note.user?.name || "Unknown"}
              </p>

              {/* Bottom */}
              <div className="flex justify-between items-center mt-4">

                <span className="text-xs text-gray-400">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>

                <div className="flex gap-2">

                  <Link
                    to={`/viewnote/${note._id}`}
                    state={{ note }}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm"
                  >
                    View
                  </Link>

                  {/* 🔥 Only owner */}
                  {note.user?._id === userId && (
                    <>
                      <Link
                        to={`/edit/${note._id}`}
                        className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(note._id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </>
                  )}

                </div>
              </div>

              {/* 📎 File Download */}
              {note.fileUrl && (
                <a
                  href={`http://localhost:5000${note.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-3 text-sm text-green-600 hover:underline"
                >
                  📥 Download PDF
                </a>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;