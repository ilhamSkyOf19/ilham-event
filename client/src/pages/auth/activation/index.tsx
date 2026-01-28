import AuthLayout from "@/components/layouts/AuthLayout";
import Activation from "@/components/views/Auth/Activation";
import authService from "@/services/auth.service";

// Props
type Props = {
  status: "success" | "failed";
};
const ActivationPage = ({ status }: Props) => {
  return (
    <AuthLayout title="Auht | Activation">
      <Activation status={status} />
    </AuthLayout>
  );
};

// get server side props
export async function getServerSideProps(context: {
  query: { code?: string | string[] };
}) {
  const code = context.query.code;

  if (!code || Array.isArray(code)) {
    return {
      props: { status: "failed" },
    };
  }

  try {
    const result = await authService.activation(code);

    return {
      props: {
        status: result.status === "success" ? "success" : "failed",
      },
    };
  } catch {
    return {
      props: { status: "failed" },
    };
  }
}

export default ActivationPage;
