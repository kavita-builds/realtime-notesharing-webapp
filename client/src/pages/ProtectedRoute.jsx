import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // ❌ No token → redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // 🔥 Decode token
    const payload = JSON.parse(atob(token.split(".")[1]));

    // ⏳ Check expiry
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }

  } catch (err) {
    // ❌ Invalid token
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  // ✅ Valid token
  return children;
}

export default ProtectedRoute;