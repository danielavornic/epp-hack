import React, { useState, ReactNode } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { FaIndustry, FaUniversity } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

interface ChildComponentProps {
  children: ReactNode;
}

const SideBar: React.FC<ChildComponentProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const menus = [
    { name: "Opportunities", link: "/uni/opportunities", icon: FaIndustry },
    { name: "Faculties", link: "/uni/faculties", icon: FaUniversity },
    { name: "Log Out", link: "/uni/login", icon: IoLogOut }
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`min-h-screen bg-primary ${open ? "w-72" : "w-16"} px-4 text-white duration-500`}
      >
        <div className="flex justify-end py-3">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="relative mt-4 flex flex-col gap-4">
          {menus?.map((menu, i) => (
            <Link
              onClick={() => {
                setCurrentPage(i);
              }}
              href={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } ${i === 2 ? "mt-[500px]" : ""} group flex items-center gap-3.5  rounded-md p-2 text-sm font-medium hover:bg-gray-800`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "translate-x-28 overflow-hidden opacity-0"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 w-0 overflow-hidden whitespace-pre rounded-md bg-primary px-0 py-0 font-semibold text-white drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      {<div className="w-full p-2">{children}</div>}
    </section>
  );
};

export default SideBar;
