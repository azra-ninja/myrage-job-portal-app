import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateJob } from "../../api/api";
import type { JobInput } from "../../types/Job";
import { toast } from "react-toastify";

export const useUpdateJob = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: JobInput }) =>
      updateJob(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      navigate("/manage-jobs");
      toast.success("🎉 Job Updated Successfully");
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
