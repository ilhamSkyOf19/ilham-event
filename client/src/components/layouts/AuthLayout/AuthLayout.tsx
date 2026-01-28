import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
}
const AuthLayout = ({ title, children }: Props) => {
  return (
    <Fragment>
      {/* header */}
      <PageHead title={title} />
      <section className="max-w-screen-3xl mx-auto 3xl:container p-6">
        {children}
      </section>
    </Fragment>
  );
};

export default AuthLayout;
