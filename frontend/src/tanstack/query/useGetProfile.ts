import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/api";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
