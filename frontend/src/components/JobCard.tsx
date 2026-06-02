import { Link } from "react-router-dom";
import type { Job } from "../types/Job";
import { useApplyApplication } from "../tanstack/mutations/useApplyApplication";
import Loader from "./Loader";


const JobCard = ({
  _id,
  title,
  company,
  description,
  location,
  salary,
}: Job) => {
  const { mutate: applyJob, isPending } = useApplyApplication();
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
            <button
              className="btn btn-primary btn-sm w-full mt-4"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                applyJob(_id);
              }}
              disabled={isPending}
            >
              {isPending ? <Loader /> : "Apply Now"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
