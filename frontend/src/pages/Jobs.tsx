import JobCard from "../components/JobCard";





const Jobs = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Explore Opportunities
          </h1>

          <p className="text-slate-500 mt-2">
            Discover jobs from top companies and find the role that
            matches your skills.
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
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
