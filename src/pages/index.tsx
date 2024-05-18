import { Layout } from "@/components/uni/";
import { Hero } from "@/components/uni/layout/Hero";
import clsx from "clsx";
import { BookOpenCheck } from "lucide-react";

export default function Home() {
  return (
    <Layout title="Home">
      <Hero />
      <section className="container flex flex-col items-center justify-center space-y-8 py-20">
        <BookOpenCheck className="text-primary-700" size={60} />
        <h2 className={clsx("text-center text-3xl font-bold text-primary-700")}>
          Welcome to Erasmus++ <br />
          Your one-stop shop for Erasmus+ opportunities
        </h2>
        <p className="text-center text-base text-gray-600">
          Find the best opportunities for you to study, work, volunteer, or teach abroad.
        </p>
      </section>
    </Layout>
  );
}
