
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registerImage from "../assets/register.png";

function Register() {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // handle register
  const handleRegister = async (e) => {
    e.preventDefault();

    // validation
    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setError("");
      alert("Account created successfully");

      // redirect to login page
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-indigo-100 to-teal-200">

      {/* Left Side Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-10">
        <img
          src={registerImage}
          alt="Register"
          className="w-[80%] h-[80%] object-cover rounded-2xl shadow-xl"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">

          <h1 className="text-3xl font-bold text-center text-gray-800">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Join us and start your journey
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-center mt-3">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="mt-6 space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 text-sm">
              <input type="checkbox" required />
              <span>
                I agree to the{" "}
                <Link className="text-teal-600 hover:underline" to="#">
                  Terms of Service
                </Link>
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Create Account
            </button>

          </form>

          {/* Login link */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
