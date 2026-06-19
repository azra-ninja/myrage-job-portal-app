import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { LoginUserInput } from "../../types/User";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: LoginUserInput) => loginUser(formData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.clear();
      navigate("/dashboard");
      toast.success("🎉 Logged In Successfully");
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
