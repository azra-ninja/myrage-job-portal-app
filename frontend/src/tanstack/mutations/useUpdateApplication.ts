import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplication } from "../../api/api";
import { toast } from "react-toastify";
import type { ApplicationInput } from "../../types/Application";

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ApplicationInput }) =>
      updateApplication(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("🎉 Status Updated");
    },
    onError: (error: any) => {
      const errors = error?.response?.data?.errors;

      if (errors && Array.isArray(errors)) {
        errors.forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });
};
