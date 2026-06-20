import { useState } from "react";
import { Link } from "react-router-dom";
import { useCreateJob } from "../tanstack/mutations/useCreateJob";
import Loader from "../components/Loader";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [currency, setCurrency] = useState("NGN");

  const { mutate: createJob, isPending } = useCreateJob();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      title,
      company,
      description,
      location,
      salary: {
        min: Number(minSalary),
        max: Number(maxSalary),
        currency,
      },
    };

    createJob(formData);
  };
  return (
    <section className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create Job</h1>

            <p className="text-slate-500 mt-2">Add a new job opportunity</p>
          </div>

          <Link to="/manage-jobs" className="btn btn-outline">
            Back
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-xl shadow border border-slate-200">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Job Title
              </label>

              <input
                type="text"
                placeholder="e.g Backend Developer"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Company
              </label>

              <input
                type="text"
                placeholder="Company name"
                className="input input-bordered w-full"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>

              <textarea
                placeholder="Describe the job description..."
                className="textarea textarea-bordered w-full h-36"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location
              </label>

              <input
                type="text"
                placeholder="Remote, Lagos, Abuja..."
                className="input input-bordered w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Salary
              </label>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Minimum"
                  className="input input-bordered w-full"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Maximum"
                  className="input input-bordered w-full"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(e.target.value)}
                />

                <select
                  className="select select-bordered w-full"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option>NGN</option>

                  <option>USD</option>

                  <option>EUR</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button type="submit" className="btn btn-primary flex-1">
                {isPending ? <Loader /> : "Create Job"}
              </button>

              <Link
                to="/manage-jobs"
                className="btn bg-red-500 hover:bg-red-600 flex-1"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateJob;
