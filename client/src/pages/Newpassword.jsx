import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Newpassword() {
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/reset", {
        email,
        password,
      });

      alert("✅ Password updated successfully");

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold text-center">
          New Password
        </h2>

        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mt-4 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-green-500 text-white p-2 rounded"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}

export default Newpassword;