import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import registerImage from "../assets/register.png";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await API.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setError("");
      alert("Account created successfully");

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-indigo-100 to-teal-200">

      {/* Left Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-10">
        <img
          src={registerImage}
          alt="Register"
          className="w-[80%] h-[80%] object-cover rounded-2xl shadow-xl"
        />
      </div>

      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">

          <h1 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Join us and start your journey
          </p>

          {error && (
            <p className="text-red-500 text-center mt-3">{error}</p>
          )}

          <form onSubmit={handleRegister} className="mt-6 space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" required />
              <span>
                I agree to{" "}
                <Link className="text-teal-600" to="#">
                  Terms
                </Link>
              </span>
            </div>

            <button className="w-full bg-teal-600 text-white py-2 rounded-lg">
              Create Account
            </button>

          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <Link className="text-blue-600" to="/login">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;