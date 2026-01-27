import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@heroui/react";
import PageHead from "@/components/commons/PageHead";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      {/* head page */}
      <PageHead title="Home Page" />

      <p>Hello World</p>

      <Button color="primary">Button</Button>

      {/* page head */}
      <PageHead title="Home Page" />
    </main>
  );
}
