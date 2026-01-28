import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";
import { Inter } from "next/font/google";
import { cn } from "@/utils/cn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// query client
const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <main
            className={cn(
              inter.className,
              "flex min-h-screen min-w-full flex-col items-center justify-center gap-10 bg-zinc-50 font-sans dark:bg-black",
            )}
          >
            <Component {...pageProps} />
          </main>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
