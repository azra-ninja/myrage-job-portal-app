import { useQuery } from "@tanstack/react-query";
import { dashboardStats } from "../../api/api";

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: dashboardStats,
  });
};
