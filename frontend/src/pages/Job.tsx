import { useNavigate, useParams } from "react-router-dom";
import { useGetJob } from "../tanstack/query/useGetJob";
import Loader from "../components/Loader";
import { useApplyApplication } from "../tanstack/mutations/useApplyApplication";
import { useGetApplications } from "../tanstack/query/useGetApplications";
import { useGetProfile } from "../tanstack/query/useGetProfile";

const Job = () => {
  const { id } = useParams();

  const { data: job, isLoading, error } = useGetJob(id || "");
  const { mutate: applyJob, isPending} = useApplyApplication();
  const { data: applications } = useGetApplications();
  const { data: profile } = useGetProfile();

  const navigate = useNavigate();

  const isApplicant = profile?.role === "applicant";

  const alreadyApplied = applications?.applications.some(
    (application: any) => application.jobId._id === job?._id,
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Loading */}
        {isLoading && <Loader />}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6">
            {(error as any)?.response?.data?.message || "Something went wrong"}
          </div>
        )}

        {/* Job Card */}
        {job && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>

              <p className="text-slate-500 mt-1 text-lg">{job.company}</p>

              <p className="text-slate-500 mt-1">📍 {job.location}</p>
            </div>

            {/* Salary */}
            <div className="inline-block bg-green-50 text-green-700 font-semibold px-4 py-2 rounded-full mb-6">
              💰 {job.salary?.currency} {job.salary?.min?.toLocaleString()} -{" "}
              {job.salary?.max?.toLocaleString()}
            </div>

            {/* Description */}
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">
                Job Description
              </h2>

              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Apply button */}
            <div className="mt-8 flex gap-3">
              {isApplicant && (
                <button
                  className={`${alreadyApplied ? "bg-gray-300 text-black" : "bg-blue-600 text-white hover:bg-blue-700"} px-6 py-3 rounded-xl  transition`}
                  onClick={() => applyJob(job?._id)}
                  disabled={alreadyApplied || isPending}
                >
                  {alreadyApplied ? (
                    "✔ Applied"
                  ) : isPending ? (
                    <Loader />
                  ) : (
                    "Apply Now"
                  )}
                </button>
              )}
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition"
                onClick={() => navigate("/jobs")}
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Job;
