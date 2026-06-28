import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import { createUser } from "../../api/api";
import { toast } from "react-toastify";


export const useCreateUser = () => {
    const navigate = useNavigate();

    return useMutation({
      mutationFn: (formData: FormData) => createUser(formData),
      onSuccess: () => {
        navigate("/users");
        toast.success("🎉 User Created Successfully");
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