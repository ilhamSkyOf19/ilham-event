import PageHead from "@/components/commons/PageHead";
import { Fragment, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
}
const AuthLayout = ({ title, children }: Props) => {
  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 bg-zinc-50 font-sans dark:bg-black">
      {/* header */}
      <PageHead title={title} />
      <section className="max-w-screen-3xl mx-auto 3xl:container p-6">
        {children}
      </section>
    </div>
  );
};

export default AuthLayout;
