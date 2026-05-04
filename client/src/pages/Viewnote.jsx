import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Viewnote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/notes/${id}`);
      setNote(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!note) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex h-screen">

      <Sidebar />
      <div className="w-px bg-black"></div>

      <div className="flex-1 p-10 bg-gray-100 overflow-y-auto">

        {/* Back */}
        <Link
          to="/dashboard"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded mb-5"
        >
          ← Back
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold">{note.title}</h1>

        {/* User + Date */}
        <p className="mt-2 text-gray-600">
          {note.user?.name || "Unknown User"}
        </p>

        <p className="text-gray-600">
          {new Date(note.createdAt).toLocaleDateString()}
        </p>

        {/* Tags */}
        <div className="flex gap-3 mt-5 flex-wrap">
          {note.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-200 text-blue-800 px-4 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CONTENT */}
        {note.content && (
          <div className="bg-white p-6 rounded-xl shadow-md mt-8">
            <h2 className="text-lg font-semibold mb-3">Content</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {note.content}
            </p>
          </div>
        )}

        {/* FILE / PDF VIEWER */}
        {note.fileUrl && (
          <div className="bg-white p-6 rounded-xl shadow-md mt-8">

            <h2 className="text-lg font-semibold mb-3">
              Attached File
            </h2>

            {/* PDF Preview */}
            <iframe
              src={`${BASE_URL}${note.fileUrl}`}
              className="w-full h-[500px] border rounded mb-4"
              title="PDF Viewer"
            ></iframe>

            {/* Download Button */}
            <a
              href={`${BASE_URL}${note.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              Download File
            </a>

          </div>
        )}

        {/* EMPTY STATE */}
        {!note.content && !note.fileUrl && (
          <p className="text-gray-500 mt-8">
            No content available
          </p>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-8">

          <Link
            className="bg-yellow-500 text-white px-5 py-2 rounded"
            to="/dashboard"
          >
            Back to Dashboard
          </Link>

          <Link
            to={`/edit/${note._id}`}
            className="bg-green-500 text-white px-5 py-2 rounded"
          >
            Edit
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Viewnote;