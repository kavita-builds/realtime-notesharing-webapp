import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notes/${id}`
        );

        setTitle(res.data.title);
        setDescription(res.data.description);
        setLoading(false);

      } catch (err) {
        console.log(err);
      }
    };

    fetchNote();
  }, [id]);

  // 🔥 UPDATE NOTE (WITH TOKEN)
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/notes/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ IMPORTANT
          },
        }
      );

      alert("✅ Note updated");
      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      alert("❌ Update failed");
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-px bg-gray-300"></div>

      <div className="flex-1 p-10 bg-gray-100">
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ← Back
        </Link>

        <h1 className="text-3xl font-bold mt-5">Edit Note</h1>

        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded h-40"
          />

          <button className="bg-green-500 text-white px-6 py-2 rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;