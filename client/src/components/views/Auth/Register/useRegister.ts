import authService from "@/services/auth.service";
import { IRegister } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// schema
const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your fullname"),
  username: yup.string().required("Please input your username"),
  email: yup
    .string()
    .email("email format nor valid")
    .required("Please input your email"),
  password: yup.string().min(8).required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "password doesn't match")
    .min(8)
    .required("Please input your confirm password"),
});

const useRegister = () => {
  // push
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  // handle visible
  const handleVisiblePassword = (type: "password" | "confirmPassword") => {
    setIsVisiblePassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  //   use form register
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  //   register service
  const registerService = async (payload: IRegister) => {
    const result = await authService.register(payload);
    return result;
  };

  // use mutation
  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,

    onError: (error) => {
      // cek error
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response?.data.data === "username") {
          setError("username", {
            message: error.response?.data.message,
          });
        } else if (error.response?.data.data === "email") {
          setError("email", {
            message: error.response?.data.message,
          });
        }
      } else {
        setError("root", {
          message: error.message,
        });
      }
    },

    onSuccess: (data) => {
      console.log(data);

      // push
      router.push("/auth/register/success");
    },
  });

  //   handle register
  const onSubmit = async (payload: IRegister) => {
    mutateRegister(payload);
  };

  return {
    isVisiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    isPendingRegister,
  };
};

export default useRegister;
