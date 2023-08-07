"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { ThemeProps } from "@/themes/theme";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import supabase from "../../../libs/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { error } from "console";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const { baseTextColor } = useTheme().colors as ThemeProps["colors"];
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();

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
      isGuest: true,
    },
  });

  const toggleVariant = useCallback(() => {
    if (!isLoading) {
      if (variant === "LOGIN") {
        setVariant("REGISTER");
      } else {
        setVariant("LOGIN");
      }
    }
  }, [variant, isLoading]);

  // Event handlers
  const onUserSubmit: SubmitHandler<FieldValues> = async (data) => {
    // setIsLoading(true);

    const { username, email, password, isGuest } = data;

    if (variant === "REGISTER") {
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            // username: username,
            is_guest: isGuest,
          },
          emailRedirectTo: `${location.origin}/api/callback`,
        },
      });
      router.refresh();
    } else if (variant === "LOGIN") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
      }

      router.refresh();
    }
  };

  const onGuestSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {};

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => router.refresh());

    return () => {
      subscription.unsubscribe;
    };
  }, [supabase, router]);

  return (
    <form
      className="flex flex-col space-y-5"
      onSubmit={handleSubmit(onUserSubmit)}
    >
      <div className="flex flex-col space-y-6">
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
              extra="notGuest"
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
              onClick={() => {}}
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
