import { useQuery } from "@tanstack/react-query";
import { getApplications } from "../../api/api";

export const useGetApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
  });
};
