"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { ThemeProps } from "@/themes/theme";
import { useTheme } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (
    data,
    event
  ) => {
    event?.preventDefault();
    console.log(data);
    setIsLoading(true);
    console.log("submitted");

    if (variant === "REGISTER") {
      axios.post("/api/register", data).catch((err) => console.log(err));
    }
  };

  const { baseTextColor } = useTheme().colors as ThemeProps["colors"];

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
          />
        )}

        <Input
          id="email"
          type="email"
          label="Email"
          register={register}
          errors={errors}
          disabled={isLoading}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          register={register}
          errors={errors}
          disabled={isLoading}
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
        className="flex gap-2 justify-center text-sm px-2"
        style={{ color: baseTextColor }}
      >
        {variant === "LOGIN" ? "New player?" : "Already have an account?"}
        <div onClick={toggleVariant} className="underline cursor-pointer">
          {variant === "LOGIN" ? "Register" : "Login"}
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
