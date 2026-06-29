import { useState } from "react";
import { useGetAllUsers } from "../tanstack/query/useGetAllUsers";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { getRoleColour } from "../data/roleColour";

const Users = () => {
  const [page, setPage] = useState(1);
  const { data: users, isLoading } = useGetAllUsers(page);


  return (
    <section className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Manage Users</h1>

            <p className="text-slate-500 mt-2">
              View and manage all registered users on the platform.
            </p>
          </div>

          <Link to="/create-user" className="btn btn-primary">
            + Create User
          </Link>
        </div>

        {isLoading && <Loader />}

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow border border-slate-200 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-4">Name</th>

                <th className="p-4">Email</th>

                <th className="p-4">Role</th>

                <th className="p-4">Avatar</th>

                <th className="p-4">Date</th>

                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users?.users?.map((user) => (
                <tr
                  className="border-b border-slate-200 hover:bg-slate-50"
                  key={user._id}
                >
                  <td className="p-4 font-medium">{user.name}</td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getRoleColour(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4 align-middle">
                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2 overflow-hidden">
                      <img
                        alt="avatar"
                        src={`http://localhost:5000${user.image}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  <td className="p-4">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <Link to={`/view-user/${user._id}`} className="btn btn-sm bg-green-300 hover:bg-green-400">
                      View
                    </Link>
                    <Link to={`/update-user/${user._id}`} className="btn btn-sm bg-yellow-300 hover:bg-yellow-400">
                      Edit
                    </Link>

                    <button className="btn btn-sm btn-error text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!users?.users?.length && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-500">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="join bg-white shadow border border-slate-200 rounded-lg overflow-hidden">
            <button
              className="join-item btn btn-sm"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              «
            </button>

            <button className="join-item btn btn-sm btn-active">{page}</button>

            <button
              className="join-item btn btn-sm"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === users?.totalPages}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
