import { Link, useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import { useGetProfile } from "../tanstack/query/useGetProfile";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const {data: user} = useGetProfile();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="sticky top-0 z-50 border-b bg-base-100/90 backdrop-blur">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="flex-1">
          <Link to="/">
            <img src={logo} className="w-40" alt="logo" />
          </Link>
        </div>

        <div className="flex-none">
          <ul className="flex items-center gap-2 font-medium">
            <li>
              <Link
                to="/"
                className="px-4 py-2 rounded-lg hover:bg-base-200 transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/jobs"
                className="px-4 py-2 rounded-lg hover:bg-base-200 transition"
              >
                Jobs
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="px-4 py-2 rounded-lg hover:bg-base-200 transition"
              >
                About
              </Link>
            </li>

            {!token && (
              <>
                <li>
                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg hover:bg-base-200 transition"
                  >
                    Register
                  </Link>
                </li>

                <li>
                  <Link to="/login" className="btn btn-primary rounded-xl">
                    Login
                  </Link>
                </li>
              </>
            )}

            {token && (
              <li>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                      <img
                        alt="avatar"
                        src={user?.image}
                        
                      />
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>

                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>

                    <li>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
