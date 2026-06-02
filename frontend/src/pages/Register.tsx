const Register = () => {
  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white shadow-lg rounded-2xl border border-slate-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Create Account
            </h1>

            <p className="text-slate-500 mt-2">
              Join our platform and start exploring opportunities.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
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
                placeholder="••••••••"
                className="input input-bordered w-full"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Register As
              </label>

              <select className="select select-bordered w-full">
                <option>Job Seeker</option>
                <option>Employer</option>
              </select>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <span className="text-primary font-medium cursor-pointer">
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
