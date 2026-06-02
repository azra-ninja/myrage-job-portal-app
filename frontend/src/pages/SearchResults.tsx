import { useSearchParams } from "react-router-dom";
import { useSearchJob } from "../tanstack/query/useSearchJob";
import Loader from "../components/Loader";
import JobCard from "../components/JobCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const { data: jobs, isLoading, error } = useSearchJob(query);
  return (
    <section className="py-12 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Search Results</h1>

          <p className="text-slate-500 mt-2">
            Results for{" "}
            <span className="font-semibold text-slate-700">"{query}"</span>
          </p>
        </div>

        {/* Loading */}
        {isLoading && <Loader />}

        {/* Error */}
        {error && (
          <p className="text-red-500 mb-6">Error loading search results</p>
        )}

        {/* Empty state */}
        {!isLoading && jobs?.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-slate-700">
              No jobs found
            </h2>
            <p className="text-slate-500 mt-2">Try a different keyword</p>
          </div>
        )}

        {/* Results grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs?.map((job) => (
            <JobCard
              key={job._id}
              _id={job._id}
              title={job.title}
              company={job.company}
              description={job.description}
              location={job.location}
              salary={job.salary}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
