import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProfile } from "../tanstack/query/useGetProfile";

const Profile = () => {
  const { data: profile, isLoading, error } = useGetProfile();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl border border-slate-200 p-8">
        {isLoading && <Loader />}

        {error && (
          <p className="text-sm text-red-500">
            {(error && (error as any)?.response?.data?.message) ||
              "Something went wrong"}
          </p>
        )}
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src={`http://localhost:5000${profile?.image}`}
            alt="profile"
            className="w-28 h-28 rounded-full ring-4 ring-primary object-cover"
          />

          <h1 className="text-2xl font-bold mt-4 text-slate-800">
            {profile?.name}
          </h1>

          <p className="text-slate-500">{profile?.role}</p>
        </div>

        {/* Info Section */}
        <div className="mt-8 space-y-4">
          <div className="bg-slate-100 p-4 rounded-xl">
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium">{profile?.email}</p>
          </div>

          <div className="bg-slate-100 p-4 rounded-xl">
            <p className="text-sm text-slate-500">Resume</p>
            <a
              href={`http://localhost:5000${profile?.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              View Resume
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          <Link to="/update-profile" className="btn btn-primary flex-1">
            Update Profile
          </Link>

          <Link
            to="/dashboard"
            className="btn bg-red-500 hover:bg-red-600 transition flex-1"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
