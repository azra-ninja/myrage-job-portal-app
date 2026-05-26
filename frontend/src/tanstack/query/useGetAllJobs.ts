import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../api/api";
import type { Job } from "../../types/Job";

export const useGetAllJobs = () => {
  return useQuery<Job[]>({
    queryKey: ["job"],
    queryFn: getAllJobs,
  });
};