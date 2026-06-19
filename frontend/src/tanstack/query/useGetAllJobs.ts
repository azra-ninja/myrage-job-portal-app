import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "../../api/api";
import type { JobResponse } from "../../types/Job";

export const useGetAllJobs = (page: number) => {
  return useQuery<JobResponse>({
    queryKey: ["jobs", page],
    queryFn: () => getAllJobs(page),
  });
};