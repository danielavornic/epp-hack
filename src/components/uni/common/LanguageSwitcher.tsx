import { Button } from "@nextui-org/react";
import { Globe } from "lucide-react";
import React from "react";

export const LanguageSwitcher = () => {
  return (
    <Button className="bg-primary-800 text-gray-100" variant="flat" startContent={<Globe />}>
      EN
    </Button>
  );
};
