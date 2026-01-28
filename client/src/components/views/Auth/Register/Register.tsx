import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  // call use register
  const {
    isVisiblePassword,
    handleVisiblePassword,
    control,
    errors,
    handleSubmit,
    isPendingRegister,
    onSubmit,
    reset,
  } = useRegister();

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
          <h2 className="text-xl font-bold text-danger-500">Create Account</h2>
          <p className="text-small mb-4">
            Have an account?&nbsp;
            <Link href="/auth/login" className="font-semibold text-danger-400">
              Login
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
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Fullname"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.fullName !== undefined}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />

            {/* username */}
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Username"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.username !== undefined}
                  errorMessage={errors.username?.message}
                />
              )}
            />

            {/* email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
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
                  type={isVisiblePassword.password ? "text" : "password"}
                  label="Password"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <button
                      className=""
                      type="button"
                      onClick={() => handleVisiblePassword("password")}
                    >
                      {isVisiblePassword.password ? (
                        <FaEye className="text-xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              )}
            />

            {/* confirm password */}
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisiblePassword.confirmPassword ? "text" : "password"}
                  label="Password Confirmation"
                  variant="bordered"
                  autoComplete="off"
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                  endContent={
                    <button
                      className=""
                      type="button"
                      onClick={() => handleVisiblePassword("confirmPassword")}
                    >
                      {isVisiblePassword.confirmPassword ? (
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
              {isPendingRegister ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
