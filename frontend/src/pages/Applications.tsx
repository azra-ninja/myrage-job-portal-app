import { useState } from "react";
import { useDeleteApplication } from "../tanstack/mutations/useDeleteApplication";
import { useGetApplications } from "../tanstack/query/useGetApplications";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetProfile } from "../tanstack/query/useGetProfile";
import { useUpdateApplication } from "../tanstack/mutations/useUpdateApplication";


const Applications = () => {
  const [page, setPage] = useState(1);
  const { data: applications, isLoading } = useGetApplications(page);
  const { mutate: deleteApplication } = useDeleteApplication();
  const { data: profile } = useGetProfile();
  const { mutate: updateStatus } = useUpdateApplication();

  const isAdmin = profile?.role === "admin";

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleStatusChange = (id: string, status: string) => {
    updateStatus({ id, data: { status } })
  }

  const getStyleStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "reviewed":
        return "bg-blue-100 text-blue-700";
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);

    deleteApplication(id, {
      onSettled: () => {
        setDeletingId(null);
      },
    });
  };
  return (
    <section className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow border-slate-300 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              My Applications
            </h1>

            <p className="text-slate-500 mt-2">
              Track all jobs you have applied to
            </p>
          </div>

          {/* Back Button */}
          <Link to="/dashboard" className="btn btn-outline">
            ← Back to Dashboard
          </Link>
        </div>

        {isLoading && <Loader />}

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow border-stone-500 overflow-x-auto">
          <table className="w-full text-left">
            {/* Table Head */}
            <thead className="bg-slate-100 border-b-stone-300">
              {isAdmin ? (
                <tr>
                  <th className="p-4">Applicant</th>
                  <th className="p-4">Job</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              ) : (
                <tr>
                  <th className="p-4">Job Title</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Applied Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              )}
            </thead>

            {/* Table Body (Static UI) */}
            <tbody>
              {isAdmin
                ? applications?.applications?.map((application) => (
                    <tr
                      className="border-b border-b-slate-200 hover:bg-slate-50"
                      key={application._id}
                    >
                      <td className="p-4 font-medium">
                        {application.userId?.name || "Deleted User"}
                      </td>

                      <td className="p-4">
                        {application.jobId?.title || "N/A"}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStyleStatus(
                            application.status,
                          )}`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td className="p-4">
                        {application.createdAt
                          ? new Date(application.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="p-4 text-right">
                        <select
                          className="select select-bordered select-sm"
                          value={application.status}
                          onChange={(e) =>
                            handleStatusChange(application._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))
                : applications?.applications?.map((application) => (
                    <tr
                      className="border-b border-b-slate-200 hover:bg-slate-50"
                      key={application._id}
                    >
                      <td className="p-4 font-medium">
                        {application.jobId?.title || "Deleted Job"}
                      </td>

                      <td className="p-4">
                        {application.jobId?.company || "N/A"}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStyleStatus(
                            application.status,
                          )}`}
                        >
                          {application.status}
                        </span>
                      </td>

                      <td className="p-4">
                        {application.createdAt
                          ? new Date(application.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          className="text-red-500 font-medium hover:underline"
                          onClick={() => handleDelete(application._id)}
                          disabled={deletingId === application._id}
                        >
                          {deletingId === application._id
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="join bg-white shadow border border-slate-200 rounded-lg overflow-hidden">
            <button
              className="join-item btn btn-sm"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              «
            </button>

            <button className="join-item btn btn-sm btn-active">{page}</button>

            <button
              className="join-item btn btn-sm"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === applications?.totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Applications;
