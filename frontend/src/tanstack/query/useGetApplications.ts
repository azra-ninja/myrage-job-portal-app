import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../../api/api";
import type { ApplicationResponse } from "../../types/Application";

export const useGetApplications = (page: number, options = {}) => {
  return useQuery<ApplicationResponse>({
    queryKey: ["applications", page],
    queryFn: () => getApplications(page),
    ...options,
  });
};
