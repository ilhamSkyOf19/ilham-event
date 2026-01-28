import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";

// props
interface ActivationProps {
  status: "success" | "failed";
}

const Activation = ({ status }: ActivationProps) => {
  // route
  const router = useRouter();

  return (
    <div className="flex w-full flex-col justify-center items-center gap-4">
      <div className="flex flex-col justify-center items-center gap-8">
        <Image
          src={"/images/general/logo.svg"}
          alt="logo"
          className="w-30"
          width={180}
          height={180}
        />
        <Image
          src={
            status === "success"
              ? "/images/illustration/success.svg"
              : "/images/illustration/pending.svg"
          }
          alt="logo"
          className="w-60 lg:w-sm"
          width={300}
          height={300}
        />
      </div>

      {/* label */}
      <div className="flex flex-col justify-center items-center gap-1">
        {/* check */}
        <h1 className="text-xl text-center lg:text-3xl font-bold text-danger-500">
          {
            {
              success: "Activation Success",
              failed: "Activation Failed",
            }[status]
          }
        </h1>
        <p className="text-sm text-center lg:text-xl font-bold text-default-500">
          {
            {
              success: "Thank you for register account in Acara",
              failed: "Confirmation code is invalid",
            }[status]
          }
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

export default Activation;
