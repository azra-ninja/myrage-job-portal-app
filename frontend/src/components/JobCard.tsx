const JobCard = () => {
  return (
    <div className="card bg-base-100 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 rounded-2xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title text-2xl">Frontend Developer</h2>

          <span className="badge badge-primary badge-outline">Full Time</span>
        </div>

        <span className="text-primary font-semibold">Meta</span>

        <p className="text-slate-600 leading-relaxed">
          Build scalable and responsive web applications using React,
          TypeScript, and Tailwind CSS.
        </p>

        <div className="flex items-center justify-between text-sm text-slate-500 mt-4">
          <span>📍 Lagos, Nigeria</span>

          <span>$3k - $5k</span>
        </div>

        <div className="card-actions mt-6">
          <button className="btn btn-primary w-full rounded-xl">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
