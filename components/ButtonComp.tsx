"use client";

import { Button, useTheme } from "@material-tailwind/react";
import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonCompProps {
  secondary?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const ButtonComp: React.FC<ButtonCompProps> = ({
  secondary,
  children,
  type,
  disabled,
}) => {
  const theme = useTheme();

  console.log(theme, theme.primaryColor);

  return (
    <div>
      <Button
        fullWidth
        type={type}
        disabled={disabled}
        color={secondary ? "gray" : theme.primaryColor}
        
      >
        {children}
      </Button>
    </div>
  );
};

export default ButtonComp;
