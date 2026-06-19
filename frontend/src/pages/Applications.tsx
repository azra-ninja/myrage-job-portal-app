import { useState } from "react";
import { useDeleteApplication } from "../tanstack/mutations/useDeleteApplication";
import { useGetApplications } from "../tanstack/query/useGetApplications";
import { Link } from "react-router-dom";

const Applications = () => {
  const { data: applications } = useGetApplications();
  const { mutate: deleteApplication } = useDeleteApplication();

  const [deletingId, setDeletingId] = useState<string | null>(null);

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
          <Link
            to="/dashboard"
            className="btn btn-outline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow border-stone-500 overflow-x-auto">
          <table className="w-full text-left">
            {/* Table Head */}
            <thead className="bg-slate-100 border-b-stone-300">
              <tr>
                <th className="p-4">Job Title</th>
                <th className="p-4">Company</th>
                <th className="p-4">Status</th>
                <th className="p-4">Applied Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body (Static UI) */}
            <tbody>
              {applications?.applications?.map((application, index) => (
                <tr
                  className="border-b border-b-slate-200 hover:bg-slate-50"
                  key={index}
                >
                  <td className="p-4 font-medium">{application.jobId.title}</td>

                  <td className="p-4">{application.jobId.company}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStyleStatus(application.status)}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(application.createdAt).toLocaleDateString()}
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
      </div>
    </section>
  );
};

export default Applications;
