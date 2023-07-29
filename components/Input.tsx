"use client";

import { ThemeProps } from "@/themes/theme";
import { Input as MuiInput, useTheme } from "@material-tailwind/react";
import type { InputProps } from "@material-tailwind/react";
import clsx from "clsx";
import { set, values } from "ramda";
import { useEffect, useState } from "react";
import {
  FieldValues,
  FieldErrors,
  UseFormRegister,
  UseFormGetFieldState,
  useController,
  UseFormGetValues,
} from "react-hook-form";
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
  tooltipContent?: string;
  getFieldState: UseFormGetFieldState<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
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
  tooltipContent,
  getFieldState,
  getValues,
}) => {
  const { baseTextColor, bgColor2, primaryColor, primaryTextColor } = useTheme()
    .colors as ThemeProps["colors"];
  const [isFieldDirty, setIsFieldDirty] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const handelAutoFill = (event: React.AnimationEvent<HTMLElement>) => {
    if (event.animationName === "onAutoFillStart") {
      setIsFieldDirty(true);
    }
  };

  const handleOnFocus = () => {
    setIsFocus(true);
    if (!disabled) {
      setIsFieldDirty(true);
    }
  };

  const handleOffFocus = (event: React.FormEvent<HTMLInputElement>) => {
    setIsFocus(false);
    !disabled && event.currentTarget.value.length !== 0
      ? setIsFieldDirty(true)
      : setIsFieldDirty(false);
  };

  const pattern = (id: string) => {
    switch (id) {
      case "username":
        return {
          value: /.{3,20}/,
          message: "Username must be from 3 to 20 characters",
        };
        break;
      case "email":
        return {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "Invalid email",
        };
        break;
      default:
        return {
          value: /.{3,}/,
          message: "Password must be above 3 characters",
        };
        break;
    }
  };

  useEffect(() => {
    const value = getValues(id);
    console.log(value);
    value !== "" ? setIsFieldDirty(true) : setIsFieldDirty(false);
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-0">
        {getFieldState(id).isDirty ? "touched" : "not touched"}
      </div>

      <MuiInput
        {...register(id, {
          required,
          pattern: pattern(id),
        })}
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
        className="input border-none"
        onAnimationStart={handelAutoFill}
      />
      <div
        className={clsx(
          isFocus ? "outline-2 border-[3px]" : "border outline-0",
          "absolute inset-0 pointer-events-none rounded-md transition-all duration-0 ease-in-out"
        )}
        style={{ borderColor: baseTextColor }}
      />
      <div className="absolute inset-x-0 bottom-0 -top-[0.4rem] flex justify-start pointer-events-none">
        <div className=" min-w-[0.5rem] pointer-events-none"></div>
        <div
          className={clsx(
            isFieldDirty
              ? "text-xs transform -translate-y-0 font-semibold"
              : "text-base translate-y-[0.8rem]",
            "flex pointer-events-none transition-all duration-200 transform-gpu ease-in-out"
          )}
        >
          <div
            className="h-fit px-2 rounded-md"
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
