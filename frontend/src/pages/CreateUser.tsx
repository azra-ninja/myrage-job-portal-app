import { Link } from "react-router-dom";

const CreateUser = () => {
  return (
    <section className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Create User</h1>

          <p className="text-slate-500 mt-2">Add a new user to the platform.</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow border border-slate-200 p-8">
          <form className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter user name"
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter user email"
                className="input input-bordered w-full"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Role
              </label>

              <select className="select select-bordered w-full">
                <option disabled selected>
                  Select role
                </option>

                <option>applicant</option>

                <option>admin</option>
              </select>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Profile Image
              </label>

              <input
                type="file"
                className="file-input file-input-bordered w-full"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
              <button className="btn btn-primary flex-1">Create User</button>

              <Link to="/users" className="btn bg-red-500 hover:bg-red-600 text-white flex-1">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateUser;
