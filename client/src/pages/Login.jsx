import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginimage from "../assets/loginimage.jpeg";

function Login() {
  const navigate = useNavigate();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // login handler
 const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Email and password are required");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    if (!res.data.token) {
      setError("Invalid login response");
      return;
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setError("");
    alert("Login successful");
    navigate("/dashboard");

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen flex bg-slate-900">

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex">
        <div className="w-full h-250 p-6 shadow-xl bg-gradient-to-br from-slate-800 via-blue-900 to-slate-800">

          {/* Title */}
          <h1 className="text-6xl font-bold text-white text-center">
            Sign in
          </h1>

          {/* Subtitle */}
          <p className="text-center text-slate-300 text-xl p-5 mt-2">
            Welcome back! Please login to continue
          </p>

          {/* Register link */}
          <div className="flex justify-center gap-2 mt-4 text-sm text-slate-300">
            <span>Don't have an account?</span>
            <Link className="text-blue-400 hover:underline" to="/register">
              Register here
            </Link>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-400 text-center mt-3">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4 text-slate-200">

            {/* Email */}
            <div>
              <label className="text-lg">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full mt-3 px-4 h-10 bg-slate-700/50 text-white placeholder-slate-400 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-lg">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full mt-3 px-4 h-10 bg-slate-700/50 text-white placeholder-slate-400 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Extra options */}
            <div className="flex items-center justify-between text-sm text-slate-300">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <Link className="text-blue-400 hover:underline" to="/forget">
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full mt-10 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-slate-900">
        <img
          src={loginimage}
          alt="Login"
          className="w-[80%] h-[80%] object-cover rounded-2xl shadow-2xl"
        />
      </div>

    </div>
  );
}

export default Login;