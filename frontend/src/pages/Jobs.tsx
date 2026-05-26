import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import { useGetAllJobs } from "../tanstack/query/useGetAllJobs";
import type { Job } from "../types/Job";


const Jobs = () => {
  const {data: jobs, isLoading, error} = useGetAllJobs();
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Explore Opportunities</h1>

          <p className="text-slate-500 mt-2">
            Discover jobs from top companies and find the role that matches your
            skills.
          </p>
        </div>

        {isLoading ? <Loader /> : null}

        {/* Jobs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {error && (
            <p className="text-red-500">
              {(error && (error as any)?.response?.data?.message) ||
                "Error while trying to get jobs."}
            </p>
          )}

          {jobs?.map((job: Job) => (
            <JobCard
              _id={job?._id}
              title={job?.title}
              company={job?.company}
              description={job?.description}
              location={job?.location}
              salary={{
                min: job?.salary?.min,
                max: job?.salary?.max,
                currency: job?.salary?.currency,
              }}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="join">
            <button className="join-item btn">«</button>
            <button className="join-item btn btn-active">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs
