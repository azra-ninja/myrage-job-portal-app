import { Link } from "react-router-dom";
import type { Job } from "../types/Job";
import { useApplyApplication } from "../tanstack/mutations/useApplyApplication";
import Loader from "./Loader";
import { useGetApplications } from "../tanstack/query/useGetApplications";
import { useGetProfile } from "../tanstack/query/useGetProfile";

const JobCard = ({
  _id,
  title,
  company,
  description,
  location,
  salary,
}: Job) => {
  const token = localStorage.getItem("token");

  const { mutate: applyJob, isPending } = useApplyApplication();

  const { data: applications } = useGetApplications({
    enabled: !!token
  });

  const { data: profile } = useGetProfile({
    enabled: !!token
  });

  const isApplicant = profile?.role === "applicant";

  const alreadyApplied = applications?.applications?.some(
    (application: any) => application.jobId?._id === _id,
  ) ?? false;
  return (
    <Link to={`/jobs/${_id}`}>
      <div className="card h-80 bg-base-100 border border-slate-200 shadow-md hover:shadow-xl transition-all">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>

          <span className="text-primary font-medium">{company}</span>

          <p className="text-md text-slate-600">
            {description.length > 120
              ? description.slice(0, 120) + "..."
              : description}
          </p>

          <div className="mt-auto">
            <p className="text-sm">📍 {location}</p>
            <p className="text-sm">
              💰 {salary?.currency} {salary?.min.toLocaleString()} -{" "}
              {salary?.max.toLocaleString()}
            </p>
            {isApplicant && (
              <button
                className="btn btn-primary text-black btn-sm w-full mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  applyJob(_id);
                }}
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
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
