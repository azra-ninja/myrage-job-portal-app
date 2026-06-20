import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteJob } from "../../api/api";
import { toast } from "react-toastify";


export const useDeleteJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string) => deleteJob(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        toast.success("🎉 Job Deleted Successfully");
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
}