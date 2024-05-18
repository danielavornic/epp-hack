import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
