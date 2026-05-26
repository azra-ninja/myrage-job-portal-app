import { useQuery } from "@tanstack/react-query";
import { getTrendingJobs } from "../../api/api";

export const useGetTrendingJobs = () => {
  return useQuery({
    queryKey: ["trending-job"],
    queryFn: getTrendingJobs,
  });
};
