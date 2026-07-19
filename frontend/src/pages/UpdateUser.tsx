import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUpdateUser } from "../tanstack/mutations/useUpdateUser";
import Loader from "../components/Loader";
import { useGetUser } from "../tanstack/query/useGetUser";


const UpdateUser = () => {
  const { id } = useParams();
  const { data: user } = useGetUser(id || "");
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { mutate: updateUser, isPending } = useUpdateUser();

  const userId = id;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    
    if (image) {
      formData.append("image", image);
    }

    updateUser({ id: userId!, formData });

  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user])

  return (
    <section className="min-h-screen bg-slate-50 p-6 flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Update User
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>

            <input
              type="text"
              value={name}
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
              value={email}
              className="input input-bordered w-full"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>

            <select
              className="select select-bordered w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option disabled value="">
                Select role
              </option>

              <option>applicant</option>

              <option>admin</option>
            </select>
          </div>

          {/* User Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Change User Image
            </label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="file-input file-input-bordered w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImage(file);
                }
              }}
            />
          </div>

          {/* Preview selected files */}
          {image && (
            <p className="text-sm text-slate-500">Image: {image.name}</p>
          )}

          <div className="mt-8 flex gap-3">
            <button className="btn btn-primary flex-1">
              {isPending ? <Loader /> : "Save Changes"}
            </button>

            <Link
              to="/users"
              className="btn bg-red-500 hover:bg-red-600 transition flex-1"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateUser;