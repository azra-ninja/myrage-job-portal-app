import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteApplication } from "../../api/api";
import { toast } from "react-toastify";


export const useDeleteApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string) => deleteApplication(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["applications"] });
        toast.success("🎉 Removed Application");
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