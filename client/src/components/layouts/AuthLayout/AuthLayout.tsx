import PageHead from "@/components/commons/PageHead";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
}
const AuthLayout = ({ title, children }: Props) => {
  return (
    <>
      {/* header */}
      <PageHead title={title} />
      <section className="max-w-screen-3xl mx-auto 3xl:container p-6">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
