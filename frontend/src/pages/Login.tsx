import { useState } from "react";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useLogin } from "../tanstack/mutations/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginUser, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginUser({
      email,
      password
    })
  };
  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white shadow-lg rounded-2xl border border-slate-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              Log In
            </h1>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter Email Address"
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              {isPending ? <Loader /> : "Log In"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm">
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-primary font-medium cursor-pointer">
                  Register
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
