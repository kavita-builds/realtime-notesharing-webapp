import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

function Admindashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);

  const token = localStorage.getItem("token");

  // 🔥 Fetch data
  useEffect(() => {
    fetchUsers();
    fetchNotes();
  }, []);

  // ================= USERS =================
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) => prev.filter((u) => u._id !== id));

    } catch (err) {
      alert("Delete failed");
    }
  };

  // ================= NOTES =================
  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
        }
      );
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/notes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes((prev) => prev.filter((n) => n._id !== id));

    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="w-px bg-gray-300"></div>

      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="h-20 bg-white border-b flex justify-between items-center px-8 shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-96 px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-8">

          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          {/* Tabs */}
          <div className="flex gap-8 mt-6 border-b pb-2">
            {["overview", "users", "notes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`capitalize pb-2 ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ================= OVERVIEW ================= */}
          {activeTab === "overview" && (
            <div className="grid md:grid-cols-4 gap-6 mt-6">
              <StatCard title="Total Users" value={users.length} />
              <StatCard title="Total Notes" value={notes.length} />
            </div>
          )}

          {/* ================= USERS ================= */}
          {activeTab === "users" && (
            <div className="bg-white p-6 rounded-xl shadow mt-6">
              <h2 className="text-xl font-semibold mb-4">All Users</h2>

              {users.map((user) => (
                <div
                  key={user._id}
                  className="flex justify-between py-3 border-b"
                >
                  <div>
                    <p>{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ================= NOTES ================= */}
          {activeTab === "notes" && (
            <div className="bg-white p-6 rounded-xl shadow mt-6">
              <h2 className="text-xl font-semibold mb-4">All Notes</h2>

              {notes.map((note) => (
                <div
                  key={note._id}
                  className="flex justify-between py-3 border-b"
                >
                  <div>
                    <p>{note.title}</p>
                    <p className="text-sm text-gray-500">
                      {note.user?.name}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteNote(note._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p>{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

export default Admindashboard;