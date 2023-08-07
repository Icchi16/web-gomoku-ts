"use client";

import Button from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { ThemeProps } from "@/themes/theme";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { variant } from "@material-tailwind/react/types/components/button";
import { ReactNode } from "react";

export type MenuItemProps = {
  icon: IconProp;
  btnVariant: variant;
  onClick?: () => void;
  active?: boolean;
  content: ReactNode;
};

const MenuItem: React.FC<any> = ({ data }: { data: MenuItemProps }) => {
  const { bgColor2, primaryColor } = useTheme().colors;

  return (
    <Button variant={data.btnVariant} onClick={data.onClick}>
      <div className="flex h-full py-0">
        <div className="w-14 text-xl py-0 relative">
          <div className="absolute flex items-center justify-center inset-0">
            <FontAwesomeIcon icon={data.icon} />
          </div>
        </div>
        <div className="flex-1 flex justify-start relative px-4 ">
          <div
            className="absolute inset-0 -inset-y-3 rounded-e-lg border-y border-r pointer-events-none ease-in-out transition-all duration-[600ms]"
            style={{
              backgroundColor: bgColor2,
              borderColor: primaryColor,
            }}
          ></div>
          <div className="z-10 text" style={{ color: primaryColor }}>
            {data.content}
          </div>
        </div>
      </div>
    </Button>
  );
};

export default MenuItem;
