"use client";

import { ThemeProps } from "@/themes/theme";
import { Button, useTheme } from "@material-tailwind/react";
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

const ButtonComp: React.FC<ButtonCompProps> = ({
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


  console.log("button rendered")
  return (
    <Button
      className="transition-all duration-[600ms] ease-in-out "
      variant={variant}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      onClick={onClick}
      color="gray"
      style={{
        color: secondary ? baseTextColor : primaryTextColor,
        backgroundColor:
          variant === "text"
            ? "#FFFFFF00"
            : secondary
            ? "#FFFFFF00"
            : primaryColor,
        boxShadow:
          variant === "text"
            ? isHovering
              ? `0px 6px 15px -2px ${primaryShadow}`
              : ""
            : "",
      }}
      onMouseEnter={handelMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Button>
  );
};

export default ButtonComp;
