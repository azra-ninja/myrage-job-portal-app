import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyApplication } from "../../api/api";
import { toast } from "react-toastify";

export const useApplyApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId: string) => applyApplication(jobId),
    onSuccess: () => {
      toast.success("🎉 Application submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["applications"] })
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(message);
    },
  });
};
