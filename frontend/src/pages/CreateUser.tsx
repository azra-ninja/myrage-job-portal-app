import { useState } from "react";
import { Link } from "react-router-dom";
import { useCreateUser } from "../tanstack/mutations/useCreateUser";
import Loader from "../components/Loader";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    if (image) {
      formData.append("image", image);
    }

    createUser(formData);
  };
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
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter user name"
                className="input input-bordered w-full"
                onChange={(e) => setName(e.target.value)}
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
                placeholder="Enter password"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Role
              </label>

              <select
                className="select select-bordered w-full"
                onChange={(e) => setRole(e.target.value)}
              >
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
                onChange={(e) => {
                  const image = e.target.files?.[0];

                  if (image) {
                    setImage(image);
                  }
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
              <button type="submit" className="btn btn-primary flex-1">
                {isPending ? <Loader /> : "Create User"}
              </button>

              <Link
                to="/users"
                className="btn bg-red-500 hover:bg-red-600 text-white flex-1"
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

export default CreateUser;
