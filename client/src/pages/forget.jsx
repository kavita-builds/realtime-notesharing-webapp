import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Forget() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/forget",
        { email }
      );

      alert("✅ OTP sent to your email");

      // go to verification page with email
      navigate("/verification", { state: { email } });

    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-6 p-3 border rounded-lg"
        />

        <button
          onClick={handleSend}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg"
        >
          Send OTP
        </button>

        <Link to="/login" className="block text-center mt-4">
          Back to Login
        </Link>

      </div>
    </div>
  );
}

export default Forget;