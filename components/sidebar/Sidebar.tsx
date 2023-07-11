"use client";

import Image from "next/image";
import AuthForm from "./authForm/AuthForm";
import ThemeSelector from "./themeSelector/ThemeSelector";
import { useTheme } from "@material-tailwind/react";

const Sidebar = () => {
  const theme = useTheme();

  const { bgColor2 } = theme.colors;

  return (
    // <div className="h-full rounded-r-lg" style={{ backgroundColor: bgColor2 }}>
    <div className="h-full rounded-r-lg" style={{ backgroundColor: bgColor2 }}>
      <div className="mx-4 flex flex-col h-full justify-between">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col items-center justify-center space-y-5 mt-5">
            <Image alt="Logo" src="/logo.jpg" height={120} width={120} />
          </div>
          <hr className=" border-gray-300 " />
          <div className="">
            <AuthForm />
          </div>
          <hr className=" border-gray-300 " />
        </div>
        <div>
          <div>
            <div className="py-4">
              <ThemeSelector />
            </div>
          </div>
          <div>
            <hr className=" border-gray-300 " />
            <div className="text-sm text-center text-gray-400 py-4">
              Web Gomoku make by Icchi16
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
