const JobCard = () => {
  return (
    <div className="card h-80 bg-base-100 border border-slate-200 shadow-md hover:shadow-xl transition-all">
      <div className="card-body">
        <h2 className="card-title">Frontend Developer</h2>

        <span className="text-primary font-medium">Meta</span>

        <p className="text-sm text-slate-600">
          Build responsive web applications using React, TypeScript, and
          Tailwind CSS.
        </p>

        <div className="mt-auto">
          <p className="text-sm">📍 Lagos, Nigeria</p>
          <p className="text-sm">💰 ₦500,000 - ₦800,000</p>

          <button className="btn btn-primary btn-sm w-full mt-4">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;