import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api"; // ✅ use central API

function Verification() {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleVerify = async () => {
    try {
      await API.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      alert("✅ OTP verified");

      navigate("/newpassword", { state: { email } });

    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold text-center">
          Enter OTP
        </h2>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="border p-2 mt-4 w-full rounded"
        />

        <button
          onClick={handleVerify}
          className="w-full mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Verify
        </button>

      </div>
    </div>
  );
}

export default Verification;