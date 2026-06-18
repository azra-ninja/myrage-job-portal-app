import { Link } from "react-router-dom";
import { useGetApplications } from "../tanstack/query/useGetApplications";
import { useGetDashboardStats } from "../tanstack/query/useGetDashboardStats";
import { useGetProfile } from "../tanstack/query/useGetProfile";

const Dashboard = () => {
  const { data: user } = useGetProfile();
  const { data: stats } = useGetDashboardStats();
  const { data: applications } = useGetApplications();

  const isAdmin = user?.role === "admin";

  return (
    <section className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.name} 👋
          </h1>

          <p className="text-slate-500 mt-2">
            {isAdmin
              ? "Manage your platform from here."
              : "Track your job applications and opportunities."}
          </p>
        </div>

        {/* Admin Dashboard */}
        {isAdmin ? (
          <div>
            <h2 className="text-2xl font-bold mb-5">Admin Dashboard</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="font-bold text-lg">Total Users</h3>
                <p className="text-3xl font-bold mt-3">{stats?.users ?? 0}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="font-bold text-lg">Total Jobs</h3>
                <p className="text-3xl font-bold mt-3">{stats?.jobs ?? 0}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="font-bold text-lg">Applications</h3>
                <p className="text-3xl font-bold mt-3">
                  {stats?.applications ?? 0}
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow border p-6">
              <h3 className="text-xl font-bold mb-4">Admin Actions</h3>

              <div className="flex flex-wrap gap-3">
                <button className="btn btn-primary">Create Job</button>

                <button className="btn btn-outline">Manage Users</button>

                <button className="btn btn-outline">View Applications</button>
              </div>
            </div>
          </div>
        ) : (
          /* Applicant Dashboard */
          <div>
            <h2 className="text-2xl font-bold mb-5">Applicant Dashboard</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="font-bold text-lg">Applied Jobs</h3>

                <p className="text-3xl font-bold mt-3">{applications?.count}</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="font-bold text-lg">Profile Status</h3>

                <p className="text-green-500 font-bold mt-3">Complete</p>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-xl shadow border p-6">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>

              <div className="flex flex-wrap gap-3">
                <Link to="/jobs" className="btn btn-primary">
                  Browse Jobs
                </Link>

                <button className="btn btn-outline">View Applications</button>

                <Link to="/update-profile" className="btn btn-outline">
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
