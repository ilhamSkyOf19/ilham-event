import authService from "@/services/auth.service";
import { AuthLoginRequest } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// schema
const loginSchema = yup.object().shape({
  emailOrUsername: yup.string().required("Please input your email or username"),
  password: yup.string().min(8).required("Please input your password"),
});

const useLogin = () => {
  // push
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);

  //   callback url
  const callbackUrl = (router.query.callbackUrl as string) || "/";

  // handle visible
  const handleVisiblePassword = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  //   use form register
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  //   register service
  const loginService = async (payload: AuthLoginRequest) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });

    if (result?.error && result.status === 401) {
      // set error email or username
      setError("emailOrUsername", {
        message: "email or password not match with your password",
      });

      setError("password", {
        message: "email or password not match with your password",
      });

      // throw error
      throw new Error("email or password not match with your password");
    }
    return result;
  };

  // use mutation
  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,

    onError: (error) => {
      // cek error
      console.log(error);

      if (error instanceof AxiosError) {
        if (error.status === 401) {
          setError("emailOrUsername", {
            message: "email or password not match with your password",
          });

          setError("password", {
            message: "email or password not match with your password",
          });
        }
      }
    },

    onSuccess: (data) => {
      console.log(data);

      // push
      router.push(callbackUrl);
    },
  });

  //   handle register
  const onSubmit = async (payload: AuthLoginRequest) => {
    mutateLogin(payload);
  };

  return {
    isVisiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    isPendingLogin,
  };
};

export default useLogin;
