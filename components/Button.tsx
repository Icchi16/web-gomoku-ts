"use client";

import { ThemeProps } from "@/themes/theme";
import { Button as MuiButton, useTheme } from "@material-tailwind/react";
import clsx from "clsx";
import { set } from "ramda";
import { ReactNode, useMemo, useState } from "react";

interface ButtonCompProps {
  secondary?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  variant: "filled" | "gradient" | "outlined" | "text" | undefined;
}

const Button: React.FC<ButtonCompProps> = ({
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
      className="transition-all duration-[600ms] ease-in-out text-sm px-0"
      variant={variant}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      onClick={onClick}
      color="gray"
      style={{
        color: secondary ? baseTextColor : primaryTextColor,
        backgroundColor:
          variant !== "text" && !secondary ? primaryColor : "#ffffff00",
        boxShadow:
          variant === "text" && isHovering
            ? `0px 6px 15px -2px ${primaryShadow}`
            : "",
      }}
      onMouseEnter={handelMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
