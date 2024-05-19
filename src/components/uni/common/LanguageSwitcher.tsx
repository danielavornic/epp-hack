import { Button } from "@nextui-org/react";
import clsx from "clsx";
import { Globe } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

export const LanguageSwitcher = () => {
  const router = useRouter();
  const isWhite = router.pathname === "/";

  return (
    <Button
      className={clsx({ "bg-primary-800 text-gray-100": isWhite })}
      variant="flat"
      startContent={<Globe />}
    >
      EN
    </Button>
  );
};
