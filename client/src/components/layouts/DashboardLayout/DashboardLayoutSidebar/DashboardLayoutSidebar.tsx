import { cn } from "@/utils/cn";
import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropsType {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = ({ sidebarItems, isOpen }: PropsType) => {
  // router
  const router = useRouter();
  return (
    <div
      className={cn(
        "bg-white w-full z-50 max-w-60 fixed -translate-x-full lg:translate-0 lg:relative h-screen border-r border-default-200 px-4 py-6 flex flex-col justify-between items-start transition-transform duration-300 ease-in-out",
        {
          "translate-x-0": isOpen,
        },
      )}
    >
      {/* content */}
      <div className="w-full flex-col">
        <div className="w-full flex justify-center">
          {/* logo */}
          <Image
            src={"/images/general/logo.svg"}
            alt="logo"
            width={180}
            height={60}
            className="mb-6 w-32"
            onClick={() => router.push("/")}
          />
        </div>

        {/* list box */}
        <Listbox
          items={sidebarItems}
          variant="solid"
          aria-label="Dashboard Menu"
        >
          {(item) => (
            <ListboxItem
              key={item.key}
              className={cn("my-1 h-12 text-2xl", {
                "bg-danger-500 text-white": item.href === router.pathname,
              })}
              startContent={item.icon}
              textValue={item.label}
              aria-label={item.label}
              aria-describedby={item.label}
            >
              <p className="text-small">{item.label}</p>
            </ListboxItem>
          )}
        </Listbox>
      </div>

      {/* button logout */}
      <div className="w-full flex items-start">
        <Button
          color="danger"
          fullWidth
          variant="light"
          size="lg"
          className="flex justify-start rounded-lg px-2 py-1.5"
          onPress={() => signOut()}
        >
          <CiLogout className="text-xl" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardLayoutSidebar;
