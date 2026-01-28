import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";
import useLogin from "./useLogin";

const Login = () => {
  // call use Login
  const {
    isVisiblePassword,
    handleVisiblePassword,
    control,
    errors,
    handleSubmit,
    isPendingLogin,
    onSubmit,
  } = useLogin();

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20">
      {/* ilustration */}
      <div className="w-1/3 flex flex-col justify-center items-center gap-10">
        <Image
          src={"/images/general/logo.svg"}
          alt="logo"
          width={180}
          height={180}
          loading="eager"
        />
        <Image
          src={"/images/illustration/login.svg"}
          alt="logo"
          className="w-2/3 lg:w-full"
          width={1024}
          height={1024}
          loading="eager"
        />
      </div>

      {/* box */}
      <Card>
        <CardBody className="p-8">
          <h2 className="text-xl font-bold text-danger-500">Login</h2>
          <p className="text-small mb-4">
            Don&apos;t have an account?&nbsp;
            <Link
              href="/auth/register"
              className="font-semibold text-danger-400"
            >
              Register
            </Link>
          </p>

          {/* error root */}
          {errors.root && (
            <p className="text-sm text-danger mb-2">{errors.root.message}</p>
          )}

          {/* form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4",
            )}
          >
            {/* full name */}
            <Controller
              name="emailOrUsername"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Email or Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.emailOrUsername !== undefined}
                  errorMessage={errors.emailOrUsername?.message}
                />
              )}
            />

            {/* password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisiblePassword ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className=""
                      type="button"
                      onClick={() => handleVisiblePassword()}
                    >
                      {isVisiblePassword ? (
                        <FaEye className="text-xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              )}
            />

            {/* button */}
            <Button type="submit" color="danger" size="lg">
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
