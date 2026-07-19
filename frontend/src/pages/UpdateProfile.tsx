import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetProfile } from "../tanstack/query/useGetProfile";
import { useUpdateProfile } from "../tanstack/mutations/useUpdateProfile";
import Loader from "../components/Loader";


const UpdateProfile = () => {
  const { data: profile } = useGetProfile();
  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const userId = profile?._id;
  
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

    updateProfile({ id: userId!, formData });

  };

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email)
    }
  }, [profile])

  return (
    <section className="min-h-screen bg-slate-50 p-6 flex justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          Update Profile
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

          
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>

            <input
              type="password"
              className="input input-bordered w-full"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Change Profile Image
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

          {/* Resume */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Update Resume
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="file-input file-input-bordered w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setResume(file);
                }
              }}
            />
          </div>

          {/* Preview selected files */}
          {image && (
            <p className="text-sm text-slate-500">Image: {image.name}</p>
          )}

          {resume && (
            <p className="text-sm text-slate-500">Resume: {resume.name}</p>
          )}

          <div className="mt-8 flex gap-3">
            <button className="btn btn-primary flex-1">{isPending ? <Loader /> : "Save Changes"}</button>

            <Link
              to="/profile"
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

export default UpdateProfile;


