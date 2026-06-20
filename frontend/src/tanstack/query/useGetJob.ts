import { useQuery } from "@tanstack/react-query";
import { getJobById } from "../../api/api";

export const useGetJob = (id: string, options = {}) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id),
    enabled: !!id,
  });
};
