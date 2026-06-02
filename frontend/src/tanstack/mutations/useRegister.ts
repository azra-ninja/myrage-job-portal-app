import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";
import { toast } from "react-toastify";

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (formData: FormData) => registerUser(formData),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
      toast.success("🎉 Registered Successfully");
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
