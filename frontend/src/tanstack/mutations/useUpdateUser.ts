import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateUser(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/profile");
      toast.success("🎉 Updated User Successfully")
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
