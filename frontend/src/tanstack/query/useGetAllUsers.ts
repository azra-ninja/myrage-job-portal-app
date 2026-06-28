import { useQuery } from "@tanstack/react-query";
import type { UserResponse } from "../../types/User";
import { getAllUsers } from "../../api/api";

export const useGetAllUsers = (page: number) => {
  return useQuery<UserResponse>({
    queryKey: ["users", page],
    queryFn: () => getAllUsers(page),
  });
};
