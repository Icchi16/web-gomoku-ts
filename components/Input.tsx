"use client";

import { ThemeProps } from "@/themes/theme";
import { Input as MuiInput, useTheme } from "@material-tailwind/react";
import type { InputProps } from "@material-tailwind/react";
import clsx from "clsx";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";
interface InputCompProps {
  id: string;
  label?: string;
  size?: InputProps["size"];
  variant?: InputProps["variant"];
  type?: InputProps["type"];
  required?: boolean;
  disabled?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
}

const Input: React.FC<InputCompProps> = ({
  id,
  label,
  size,
  variant,
  type,
  required,
  disabled,
  errors,
  register,
}) => {
  const { baseTextColor, bgColor2 } = useTheme().colors as ThemeProps["colors"];
  const [onFocus, setOnFocus] = useState(false);

  const handleOnFocus = () => {
    if (!disabled) {
      setOnFocus(true);
    }
  };

  const handleOffFocus = (event: React.FormEvent<HTMLInputElement>) => {
    !disabled && event.currentTarget.value.length !== 0
      ? setOnFocus(true)
      : setOnFocus(false);
  };

  console.log("input rendered");
  return (
    <div className="relative">
      <MuiInput
        {...register(id, { required })}
        variant={variant}
        type={type}
        label={label}
        size={size}
        style={{
          color: baseTextColor,
          borderColor: baseTextColor,
          backgroundColor: "#ffffff00",
          borderWidth: "1px",
        }}
        error={errors[id] ? true : false}
        success={false}
        labelProps={{
          className: "hidden",
        }}
        onFocus={handleOnFocus}
        onBlur={handleOffFocus}
        disabled={disabled}
        className="border focus:border outline-0 focus:outline-2 duration-100 transform-gpu"
      />
      <div className="absolute inset-x-0 bottom-0 -top-2 flex justify-start pointer-events-none">
        <div className=" min-w-[0.5rem] pointer-events-none"></div>
        <div
          className={clsx(
            onFocus
              ? "text-xs transform -translate-y-0 font-semibold"
              : "text-base translate-y-[0.95rem]",
            "flex pointer-events-none transition-all duration-200 transform-gpu ease-in-out"
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

export default Input;
