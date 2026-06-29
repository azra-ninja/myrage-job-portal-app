import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../api/api";

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};
