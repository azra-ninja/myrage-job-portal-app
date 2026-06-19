import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../api/api";
import type { JobInput } from "../../types/Job";
import { toast } from "react-toastify";

export const useCreateJob = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (formData: JobInput) => createJob(formData),
    onSuccess: () => {
      navigate("/manage-jobs");
      toast.success("🎉 Job Created Successfully");
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
