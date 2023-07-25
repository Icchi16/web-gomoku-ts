"use client";

import { ThemeProps } from "@/themes/theme";
import { Input, useTheme } from "@material-tailwind/react";
import type { InputProps } from "@material-tailwind/react";
import { jsx, css, ClassNames } from "@emotion/react";
import clsx from "clsx";
import { useState } from "react";
import { InputType } from "zlib";
interface InputCompProps {
  label?: string;
  labelProps?: { className?: string };
  size?: InputProps["size"];
  variant?: InputProps["variant"];
  type?: InputProps["type"];
}

const InputComp: React.FC<InputCompProps> = ({
  variant,
  type,
  label,
  size,
}) => {
  const { baseTextColor, bgColor2 } = useTheme().colors as ThemeProps["colors"];
  const [onFocus, setOnFocus] = useState(false);

  const handleOnFocus = () => {
    setOnFocus(true);
  };
  const handleOffFocus = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.value.length !== 0
      ? setOnFocus(true)
      : setOnFocus(false);
  };

  return (
    <div className="relative">
      <Input
        variant={variant}
        type={type}
        label={label}
        size={size}
        style={{ color: baseTextColor, borderColor: baseTextColor }}
        error={false}
        success={false}
        labelProps={{
          className: "hidden",
        }}
        onFocus={handleOnFocus}
        onBlur={handleOffFocus}
      />
      <div className="absolute inset-x-0 bottom-0 -top-2 flex justify-start pointer-events-none">
        <div className=" min-w-[0.5rem] pointer-events-none"></div>
        <div
          className={clsx(
            onFocus
              ? "text-xs transform -translate-y-0"
              : "text-base translate-y-[0.95rem]",
            "flex pointer-events-none transition-all duration-100 transform-gpu"
          )}
        >
          <div
            className="h-fit px-2"
            style={{ background: bgColor2, color: baseTextColor }}
          >
            {label}
          </div>
        </div>
        <div className="grow pointer-events-none"></div>
      </div>
    </div>
  );
};

export default InputComp;
