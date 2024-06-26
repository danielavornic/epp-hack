import clsx from "clsx";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent, Button, Input } from "@nextui-org/react";

import { useRouter } from "next/router";
import { useState } from "react";
import { Search } from "lucide-react";
import { LanguageSwitcher } from "../common";
import { useComparison } from "@/lib/hooks";

const links = [
  {
    title: "Home",
    href: "/"
  },
  {
    title: "Opportunities",
    href: "/opportunities",
    submenu: [
      {
        title: "All",
        href: "/opportunities"
      },
      {
        title: "Comparison",
        href: "/opportunities/comparison",
        badge: "1"
      }
    ]
  },
  {
    title: "Success stories",
    href: "/#"
  }
];

export const Navbar = () => {
  const router = useRouter();
  const { offers } = useComparison();

  const links = [
    {
      title: "Home",
      href: "/"
    },
    {
      title: "Opportunities",
      href: "/opportunities",
      submenu: [
        {
          title: "All",
          href: "/opportunities"
        },
        {
          title: "Comparison",
          href: "/opportunities/comparison",
          badge: offers.length.toString()
        }
      ]
    },
    {
      title: "Success stories",
      href: "/success-stories"
    }
  ];

  const isWhite = router.pathname === "/";

  return (
    <div
      className={clsx("z-1 relative h-[64px] border-b border-gray-300", {
        "text-white": isWhite
      })}
    >
      <nav className="container flex h-full items-center justify-between">
        <Link href="/">
          <p className="h-fit font-bold">Erasmus++</p>
        </Link>
        <ul className="flex items-center space-x-6">
          {links.map((link, index) => {
            if (link?.submenu) {
              return (
                <Popover placement="bottom">
                  <PopoverTrigger>
                    <Button
                      className={clsx(
                        "rounded-full bg-transparent px-5 py-2 text-base font-semibold  ",
                        {
                          "text-gray-200 hover:bg-primary-800": isWhite,
                          "text-primary-800 hover:bg-primary-100": !isWhite,
                          "!bg-primary-100 text-primary-800": router.pathname.includes(link.href)
                        }
                      )}
                    >
                      {link.title}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="px-4 py-2">
                      <ul>
                        {link.submenu.map((submenuLink, index) => (
                          <li
                            key={index}
                            className={clsx(
                              "font-inter flex py-1 text-base text-primary-800 hover:text-primary-700",
                              { underline: router.pathname === submenuLink.href }
                            )}
                          >
                            <Link
                              href={submenuLink.href}
                              className={clsx({ underline: router.pathname === submenuLink.href })}
                            >
                              {submenuLink.title}
                            </Link>
                            {submenuLink.badge && (
                              <span
                                className={clsx(
                                  "ml-3 rounded-full bg-primary-600 px-2 py-1 text-xs text-white"
                                )}
                              >
                                {submenuLink.badge}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </PopoverContent>
                </Popover>
              );
            }

            return (
              <li
                key={index}
                className={clsx("rounded-full px-5 py-2 font-semibold text-gray-200", {
                  "bg-primary-800": router.pathname === link.href && isWhite,
                  "text-primary-800 hover:bg-primary-100":
                    router.pathname === link.href && !isWhite,
                  "hover:bg-primary-800": router.pathname !== link.href && isWhite,
                  "text-primary-800 hover:bg-primary-100 ": !isWhite
                })}
              >
                <Link href={link.href}>{link.title}</Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center space-x-5">
          <Input
            placeholder="Quick search..."
            startContent={
              <Search className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            }
          />
          <LanguageSwitcher />
        </div>
      </nav>
    </div>
  );
};
