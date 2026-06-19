import { Link, useParams } from "react-router-dom";
import { useGetJob } from "../tanstack/query/useGetJob";
import { useUpdateJob } from "../tanstack/mutations/useUpdateJob";
import { useEffect, useState } from "react";

const UpdateJob = () => {
  const { id } = useParams();

  const { data: job } = useGetJob(id || "");
  const { mutate: updateJob, isPending } = useUpdateJob();

   const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [minSalary, setMinSalary] = useState(0);
    const [maxSalary, setMaxSalary] = useState(0);
    const [currency, setCurrency] = useState("NGN");

    const jobId = id;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const formData = {
        title,
        company,
        description,
        location,
        salary: {
          min: minSalary,
          max: maxSalary,
          currency
        }
      }

      updateJob({ id: jobId!, formData});
    }

    useEffect(() => {
      if (job) {
        setTitle(job?.title);
        setCompany(job?.company);
        setDescription(job?.description);
        setLocation(job?.location);
        setMinSalary(job?.salary?.min);
        setMaxSalary(job?.salary?.max);
        setCurrency(job?.salary?.currency);
      }
    }, [job])
  return (
    <section className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Update Job</h1>

            <p className="text-slate-500 mt-2">Modify job details</p>
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
              <label className="block text-sm font-medium mb-1">
                Job Title
              </label>

              <input
                type="text"
                placeholder="Enter job title"
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-1">Company</label>

              <input
                type="text"
                placeholder="Enter company name"
                className="input input-bordered w-full"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>

              <textarea
                placeholder="Enter job description"
                className="textarea textarea-bordered w-full h-36"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>

              <input
                type="text"
                placeholder="Enter location"
                className="input input-bordered w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium mb-2">Salary</label>

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Min salary"
                  className="input input-bordered w-full"
                  value={minSalary}
                  onChange={(e) => setMinSalary(Number(e.target.value))}
                />

                <input
                  type="number"
                  placeholder="Max salary"
                  className="input input-bordered w-full"
                  value={maxSalary}
                  onChange={(e) => setMaxSalary(Number(e.target.value))}
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
                Update Job
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

export default UpdateJob;
