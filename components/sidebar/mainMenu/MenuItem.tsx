"use client";

import Button from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export type MenuItemProps = {
  icon: IconProp;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  content: ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  disabled,
  content,
  onClick,
}) => {
  const { bgColor2, baseTextColor } = useTheme().colors;

  return (
    <Button variant="filled" onClick={onClick} disabled={disabled}>
      <div className="flex h-full py-0">
        <div className="w-14 text-xl py-0 relative">
          <div className="absolute flex items-center justify-center inset-0">
            <FontAwesomeIcon icon={icon} />
          </div>
        </div>
        <div className="flex-1 flex justify-start relative px-4 ">
          <div
            className="absolute inset-0 -inset-y-3 rounded-e-lg border-y border-r pointer-events-none ease-in-out transition-all duration-[600ms]"
            style={{
              backgroundColor: bgColor2,
              borderColor: baseTextColor,
            }}
          ></div>
          <div className="z-10 text" style={{ color: baseTextColor }}>
            {content}
          </div>
        </div>
      </div>
    </Button>
  );
};

export default MenuItem;
