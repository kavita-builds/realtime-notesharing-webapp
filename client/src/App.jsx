import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Forget from "./pages/forget";
import Verification from "./pages/verification";
import Newpassword from "./pages/Newpassword";
import Dashboard from "./pages/Dashboard";
import Admindashboard from "./pages/Admindashboard";
import Uploadnotes from "./pages/Uploadnotes";
import Sidebar from "./pages/Sidebar";
import Viewnote from "./pages/Viewnote";
import Edit from "./pages/Edit";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/Forget" element={<Forget />} />
      <Route path="/Verification" element={<Verification />} />
   <Route path="/newpassword" element={<Newpassword />} />
       <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/Dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Admindashboard"
        element={
          <ProtectedRoute>
            <Admindashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Uploadnotes"
        element={
          <ProtectedRoute>
            <Uploadnotes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/viewnote/:id"
        element={
          <ProtectedRoute>
            <Viewnote />
          </ProtectedRoute>
        }
      />

      <Route
        path="/Edit/:id"
        element={
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;