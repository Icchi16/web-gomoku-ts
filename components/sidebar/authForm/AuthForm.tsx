// "use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { ThemeProps } from "@/themes/theme";
import { useTheme } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import supabase from "@/libs/SupabaseProvider";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const { baseTextColor } = useTheme().colors as ThemeProps["colors"];

  const toggleVariant = useCallback(() => {
    if (!isLoading) {
      if (variant === "LOGIN") {
        setVariant("REGISTER");
      } else {
        setVariant("LOGIN");
      }
    }
  }, [variant, isLoading]);

  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    event?.preventDefault();
    setIsLoading(false); //! Change this

    const { email, password } = data;

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(user);
    console.log(error);
    // if (variant === "REGISTER") {
    //   axios.post("/api/register", data);
    // }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-4">
        {variant === "REGISTER" && (
          <Input
            id="username"
            label="Username"
            register={register}
            errors={errors}
            disabled={isLoading}
            tooltipContent="3 - 20 characters"
            getFieldState={getFieldState}
            getValues={getValues}
          />
        )}

        <Input
          id="email"
          type="email"
          label="Email"
          register={register}
          errors={errors}
          disabled={isLoading}
          getFieldState={getFieldState}
          getValues={getValues}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          register={register}
          errors={errors}
          disabled={isLoading}
          tooltipContent="Above 3 characters"
          getFieldState={getFieldState}
          getValues={getValues}
        />
      </div>

      <div>
        <div className="mt-5 flex w-full justify-between space-x-4">
          <div className="flex-1">
            <Button
              fullWidth
              variant="filled"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center gap-2">
                  <div>Loading</div>
                  <FontAwesomeIcon icon={faSpinner} spinPulse />
                </div>
              ) : variant === "LOGIN" ? (
                "Login"
              ) : (
                "Register"
              )}
            </Button>
          </div>
          <div className="flex-1">
            <Button
              fullWidth
              secondary
              variant="text"
              type="button"
              disabled={isLoading}
            >
              Play as guest
            </Button>
          </div>
        </div>
      </div>

      <div
        className="flex gap-2 justify-center text-xs px-2 tracking-tighter"
        style={{ color: baseTextColor }}
      >
        {variant === "LOGIN" ? "New player?" : "Already have an account?"}
        <div
          onClick={toggleVariant}
          className={clsx(!isLoading && "cursor-pointer", "underline")}
        >
          {variant === "LOGIN" ? "Register" : "Login"}
        </div>
        {variant === "LOGIN" ? "or play as Guest" : ""}
      </div>
    </form>
  );
};

export default AuthForm;
