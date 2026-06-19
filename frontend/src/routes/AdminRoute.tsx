import { Navigate, Outlet } from "react-router-dom";
import { useGetProfile } from "../tanstack/query/useGetProfile";

const AdminRoute = () => {
  const { data: user } = useGetProfile();

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
