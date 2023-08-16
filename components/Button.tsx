"use client";

import { useTheme } from "@/hooks/useTheme";
import { ThemeProps } from "@/themes/theme";
import { Button as MuiButton } from "@material-tailwind/react/components/Button";
import { ReactNode, useState } from "react";

interface ButtonCompProps {
  danger?: boolean;
  success?: boolean;
  secondary?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (...args: any) => void;
  type?: "button" | "submit" | "reset" | undefined;
  variant: "filled" | "gradient" | "outlined" | "text" | undefined;
  extra?: any;
}

const Button: React.FC<ButtonCompProps> = ({
  success,
  danger,
  secondary,
  children,
  type,
  disabled,
  fullWidth,
  variant,
  onClick,
}) => {
  const { primaryColor, baseTextColor, primaryShadow, primaryTextColor } =
    useTheme().colors as ThemeProps["colors"];
  const [isHovering, setIsHovering] = useState(false);

  const handelMouseEnter = () => {
    variant !== "text" ? setIsHovering(true) : () => {};
  };

  const handleMouseLeave = () => {
    variant === "text" ? setIsHovering(false) : () => {};
  };

  return (
    <MuiButton
      className="transition-all duration-[600ms] ease-in-out text-sm px-0 overflow-hidden"
      variant={variant}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      onClick={onClick}
      color={success ? "light-green" : danger ? "red" : "gray"}
      style={
        !success && !danger
          ? {
              color: secondary ? baseTextColor : primaryTextColor,
              backgroundColor:
                variant !== "text" && !secondary ? primaryColor : "#ffffff00",
              boxShadow:
                variant === "text" && isHovering
                  ? `0px 6px 15px -2px ${primaryShadow}`
                  : "",
            }
          : {}
      }
      onMouseEnter={handelMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
