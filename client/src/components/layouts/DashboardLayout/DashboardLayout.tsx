import PageHead from "@/components/commons/PageHead";
import { ReactNode, useState } from "react";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { SIDEBAR_ADMIN, SIDEBAR_MEMBER } from "./DashboardLayout.constans";
import { Navbar, NavbarMenuToggle } from "@heroui/react";

type PropsType = {
  children: ReactNode;
  title?: string;
  type: "admin" | "member";
  description?: string;
};
const DashboardLayout = ({ children, title, type, description }: PropsType) => {
  //   state open
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="max-w-screen-3xl 3xl:container flex">
      {/* page head */}
      <PageHead title={title || "Dashboard"} />

      {/* side bar */}
      <DashboardLayoutSidebar
        sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_MEMBER}
        isOpen={isOpen}
      />

      {/* content */}
      <div className="h-screen w-full overflow-y-auto p-8">
        {/* navbar for mobile */}
        <Navbar
          className="flex justify-between bg-transparent px-0"
          isBlurred={false}
          position="static"
          classNames={{ wrapper: "p-0" }}
        >
          <h1 className="text-3xl font-bold">{title}</h1>

          {/* navbar menut toggle */}
          <NavbarMenuToggle
            aria-label={isOpen ? "Open Menu" : "Close Menu"}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
          />
        </Navbar>

        {/* description */}
        <p className="text-small mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
