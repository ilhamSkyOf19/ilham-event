import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
  // route
  const router = useRouter();
  return (
    <div className="flex w-full flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center gap-10">
        <Image
          src={"/images/general/logo.svg"}
          alt="logo"
          className="w-30"
          width={180}
          height={180}
        />
        <Image
          src={"/images/illustration/email-send.svg"}
          alt="logo"
          className="w-60"
          width={300}
          height={300}
        />
      </div>

      {/* label */}
      <div className="flex flex-col justify-center items-center gap-1">
        {/* check */}
        <h1 className="text-xl text-center lg:text-3xl font-bold text-danger-500">
          Create Account Success
        </h1>
        <p className="text-sm text-center lg:text-xl font-bold text-default-500">
          check your email for account activation
        </p>
      </div>

      {/* button */}
      <Button
        className="mt-4 w-fit"
        variant="bordered"
        color="danger"
        onPress={() => router.push("/")}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default RegisterSuccess;
