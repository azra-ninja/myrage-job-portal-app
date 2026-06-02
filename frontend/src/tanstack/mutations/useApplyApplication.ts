import { useMutation } from "@tanstack/react-query";
import { applyApplication } from "../../api/api";
import { toast } from "react-toastify";

export const useApplyApplication = () => {
  return useMutation({
    mutationFn: (jobId: string) => applyApplication(jobId),
    onSuccess: () => {
      toast.success("🎉 Application submitted successfully!");
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
