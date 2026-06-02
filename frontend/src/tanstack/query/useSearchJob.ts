import { useQuery } from "@tanstack/react-query";
import type { Job } from "../../types/Job";
import { searchJobs } from "../../api/api";

export const useSearchJob = (search: string) => {
  return useQuery<Job[]>({
    queryKey: ["search-jobs", search],
    queryFn: () => searchJobs(search),
    enabled: !!search,
  });
};
