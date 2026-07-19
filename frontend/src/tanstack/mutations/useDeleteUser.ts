import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteUser } from "../../api/api";
import { toast } from "react-toastify";


export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: string) => deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("🎉 User Deleted Successfully");
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