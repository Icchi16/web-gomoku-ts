"use client";

import { ThemeProps } from "@/themes/theme";
import { Input as MuiInput } from "@material-tailwind/react/components/Input";
import type { InputProps } from "@material-tailwind/react";
import clsx from "clsx";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import {
  FieldValues,
  FieldErrors,
  UseFormRegister,
  UseFormGetFieldState,
  UseFormGetValues,
  Validate,
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
  disableLabel?: boolean;
  placeholder?: string;
  onChange?: (...args: any[]) => void;
  validate?: (...args: any[]) => boolean;
  regexValidate?: RegExp;
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
  disableLabel,
  placeholder,
  onChange,
  validate,
  regexValidate,
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

  return (
    <div className="relative">
      <div className="absolute min-h-[1rem] -top-4 left-0 right-1 pointer-events-none flex justify-end overflow-hidden">
        {tooltipContent && (
          <div
            className={clsx(
              getFieldState(id).error ? "translate-y-0" : "translate-y-4",
              "text-xs rounded-t-md px-3 transition-all duration-300 select-none"
            )}
            style={{ backgroundColor: baseTextColor, color: bgColor2 }}
          >
            {tooltipContent}
          </div>
        )}
      </div>

      <MuiInput
        {...register(id, {
          validate: validate,
          onChange: onChange,
          required,
          pattern: {
            value: regexValidate ?? /./g,
            message: tooltipContent ?? "",
          },
        })}
        id={id}
        name={id}
        variant={variant}
        type={type}
        label={label}
        size={size}
        style={{
          color: type === "file" ? "#a9a9a9" : baseTextColor,
          backgroundColor: "#ffffff00",
        }}
        error={errors.id ? true : false}
        success={false}
        labelProps={{
          className: "hidden",
        }}
        onFocus={handleOnFocus}
        onBlur={handleOffFocus}
        disabled={disabled}
        className={clsx(
          type === "file" ? "file:hidden pl-12" : "",
          "input border-none"
        )}
        containerProps={{ className: "after:p-0" }}
        onAnimationStart={handelAutoFill}
        placeholder={placeholder}
      />
      <div
        className={clsx(
          isFocus ? "outline-2 border-2" : "border outline-0",
          "absolute inset-0 pointer-events-none rounded-md transition-all duration-[70ms] outline ease-in-out"
        )}
        style={{ borderColor: baseTextColor, outlineColor: baseTextColor }}
      />
      <div
        className={clsx(
          disableLabel ? "hidden" : "",
          "absolute inset-x-0 bottom-0 -top-[0.4rem] flex justify-start pointer-events-none"
        )}
      >
        <div className=" min-w-[0.5rem] pointer-events-none"></div>
        <div
          className={clsx(
            isFieldDirty
              ? "text-xs transform -translate-y-[0.1rem] font-semibold"
              : "text-base translate-y-[0.9rem]",
            "flex pointer-events-none transition-all duration-200 transform-gpu ease-in-out"
          )}
        >
          <div
            className="h-fit px-2 rounded-md select-none"
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
