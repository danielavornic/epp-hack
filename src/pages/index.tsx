import clsx from "clsx";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={clsx("container h-screen", inter.className)}>
      <h1 className="text-4xl font-bold">Hello, world!</h1>
    </main>
  );
}
