"use client";

import AuthForm from "./authForm/AuthForm";
import ThemeSelector from "./themeSelector/ThemeSelector";
import { useTheme } from "@material-tailwind/react";
import Logo from "./Logo";
import { ThemeProps } from "@/themes/theme";

const Sidebar = () => {
  const { bgColor2, baseTextColor } = useTheme().colors as ThemeProps["colors"];

  return (
    <div className="h-full rounded-r-2xl" style={{ backgroundColor: bgColor2 }}>
      <div className="mx-4 flex flex-col h-full justify-between">
        <div className="flex flex-col space-y-5">
          <Logo />
          <hr className=" w-full" style={{ borderColor: baseTextColor }} />
          <div>
            <AuthForm />
          </div>
          <hr style={{ borderColor: baseTextColor }} />
        </div>
        <div>
          <div>
            <div className="py-4">
              <ThemeSelector />
            </div>
          </div>
          <div>
            <hr style={{ borderColor: baseTextColor }} />
            <div
              className="text-sm text-center py-4"
              style={{ color: baseTextColor }}
            >
              Web Gomoku make by Icchi16
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
