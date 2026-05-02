import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  // ✅ get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="bg-green-300 w-1/5 h-screen">

        {/* Top */}
        <div className="bg-amber-400 p-4">
          <h1 className="text-xl font-bold">NotesApp</h1>
          <h3>Take Better Notes</h3>
        </div>

        <hr />

        {/* Links */}
        <div className="bg-yellow-500 p-4 space-y-2">
          <Link to="/Admindashboard" className="block">Admin Dashboard</Link>
          <Link to="/Dashboard" className="block">User View</Link>
        </div>

        {/* Profile */}
        <div className="bg-blue-400 p-4 mt-auto">

          <div className="flex items-center gap-3">
            <div className="bg-green-600 rounded-full w-10 h-10 flex justify-center items-center text-white">
              {user?.name?.charAt(0) || "A"}
            </div>

            <div>
              <h1>{user?.name || "Admin User"}</h1>
              <h3 className="text-sm">{user?.email || "admin@example.com"}</h3>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-yellow-300 px-4 py-2 rounded font-semibold"
          >
            Logout
          </button>

        </div>
      </div>

      <div className="w-1 bg-black"></div>
    </>
  );
}

export default Sidebar;