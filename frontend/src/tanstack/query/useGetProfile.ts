import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/api";

export const useGetProfile = (options = {}) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    ...options
  });
};
