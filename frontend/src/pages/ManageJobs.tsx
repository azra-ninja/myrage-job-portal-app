import { Link, useNavigate } from "react-router-dom";
import { useGetAllJobs } from "../tanstack/query/useGetAllJobs";
import { useState } from "react";
import Loader from "../components/Loader";
import { useDeleteJob } from "../tanstack/mutations/useDeleteJob";

const ManageJobs = () => {
  const [page, setPage] = useState(1);
  const { data: jobs, isLoading } = useGetAllJobs(page);
  const { mutate: deleteJob } = useDeleteJob();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    setDeletingId(id);

    deleteJob(id, {
      onSettled: () => {
        setDeletingId(null);
      }
    })
  }
  return (
    <section className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Jobs</h1>

            <p className="text-slate-500 mt-2">
              Create, update and manage all job listings
            </p>
          </div>

          <Link to="/create-job" className="btn btn-primary">
            + Create Job
          </Link>
        </div>

        {isLoading && <Loader />}

        {/* Jobs Table */}
        <div className="bg-white rounded-xl shadow border-stone-500 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 border-b-stone-300">
              <tr>
                <th className="p-4">Job Title</th>

                <th className="p-4">Company</th>

                <th className="p-4">Location</th>

                <th className="p-4">Salary</th>

                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs?.jobs?.map((job) => (
                <tr
                  className="border-b border-b-slate-200 hover:bg-slate-50 cursor-pointer"
                  key={job._id}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                >
                  <td className="p-4 font-medium">{job.title}</td>

                  <td className="p-4">{job.company}</td>

                  <td className="p-4">{job.location}</td>

                  <td className="p-4">
                    {job.salary.currency} {job.salary.min.toLocaleString()}
                    {" - "}
                    {job.salary.max.toLocaleString()}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <Link
                      to={`/update-job/${job._id}`}
                      className="btn btn-sm bg-yellow-300 hover:bg-yellow-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Update
                    </Link>

                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(job._id);
                      }}
                      disabled={deletingId === job._id}
                    >
                      {deletingId === job._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}

              {!jobs?.jobs?.length && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500">
                    No jobs available
                  </td>
                </tr>
              )}
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
              disabled={page === jobs?.totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageJobs;
