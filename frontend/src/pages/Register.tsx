import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../tanstack/mutations/useRegister";
import Loader from "../components/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  const { mutate: register, isPending } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    if (image) {
      formData.append("image", image);
    }

    if (resume) {
      formData.append("resume", resume);
    }

    register(formData);
  };

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
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter Name"
                className="input input-bordered w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Upload Image
              </label>

              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  const image = e.target.files?.[0];

                  if (image) {
                    setImage(image);
                  }
                }}
              />

              <p className="text-xs text-slate-500 mt-1">
                Accepted formats: JPG, JPEG, PNG
              </p>
            </div>

            {/* Resume */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Upload Resume
              </label>

              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const resume = e.target.files?.[0];

                  if (resume) {
                    setResume(resume);
                  }
                }}
              />

              <p className="text-xs text-slate-500 mt-1">
                Accepted formats: PDF, DOCX
              </p>
            </div>
            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full">
              {isPending ? <Loader /> : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-primary font-medium cursor-pointer">
                  Log In
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
