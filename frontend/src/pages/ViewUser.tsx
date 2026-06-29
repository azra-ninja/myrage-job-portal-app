import { Link, useParams } from "react-router-dom";
import { useGetUser } from "../tanstack/query/useGetUser";
import Loader from "../components/Loader";
import { getRoleColour } from "../data/roleColour";

const ViewUser = () => {
  const { id } = useParams();

  const { data: user, isLoading } = useGetUser(id || "");
  return (
    <section className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">User Details</h1>

          <p className="text-slate-500 mt-2">
            View detailed information about this user.
          </p>
        </div>
        {isLoading && <Loader />}
        {/* User Profile Card */}
        <div className="bg-white rounded-xl shadow border border-slate-200 p-8">
          {/* Profile Section */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-2 overflow-hidden">
              <img
                src={`http://localhost:5000${user?.image}`}
                alt="user avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {user?.name}
              </h2>

              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${getRoleColour(user?.role)}`}>
                {user?.role}
              </span>
            </div>
          </div>

          {/* User Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-lg border-slate-300">
              <p className="text-sm text-slate-700">Email Address</p>

              <p className="font-semibold text-slate-900 mt-1">{user?.email}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border-slate-300">
              <p className="text-sm text-slate-700">Role</p>

              <p className="font-semibold text-slate-900 mt-1">{user?.role}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border-slate-300">
              <p className="text-sm text-slate-700">Joined Date</p>

              <p className="font-semibold text-slate-900 mt-1">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border-slate-300">
              <p className="text-sm text-slate-700">Resume</p>

              <p className="font-medium text-primary mt-1">
                <a
                  href={`http://localhost:5000${user?.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  View Resume
                </a>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <Link to={`/update-user/${user?._id}`} className="btn btn-primary flex-1">Edit User</Link>

            <Link to="/users" className="btn btn-error text-white flex-1">
              Back
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewUser;
