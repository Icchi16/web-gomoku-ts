"use client";

import { Button, useTheme } from "@material-tailwind/react";
import clsx from "clsx";
import { ReactNode, useMemo, useState } from "react";

interface ButtonCompProps {
  secondary?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  variant?: "filled" | "gradient" | "outlined" | "text" | undefined;
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
  const theme = useTheme();
  const [theme1, setTheme1] = useState("theme1");
  return (
    <div>
      <Button
        variant={variant}
        fullWidth={fullWidth}
        type={type}
        disabled={disabled}
        color={secondary ? "gray" : theme?.primaryTheme}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};

export default ButtonComp;
