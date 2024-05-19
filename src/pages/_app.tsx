import ComparisonInitializer from "@/components/uni/offer/ComparisonInitializer";
import { AppStore, makeStore } from "@/lib/store";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }: AppProps) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <ComparisonInitializer>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
              <div className={clsx(inter.className, inter.variable)}>
                <Toaster
                  position="top-right"
                  reverseOrder={false}
                  toastOptions={{ duration: 3000 }}
                />
                <Component {...pageProps} />
              </div>
            </NextThemesProvider>
          </NextUIProvider>
        </QueryClientProvider>
      </ComparisonInitializer>
    </Provider>
  );
}
