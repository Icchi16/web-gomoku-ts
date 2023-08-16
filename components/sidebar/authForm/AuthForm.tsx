"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { ThemeProps } from "@/themes/theme";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";
import getGuest from "@/actions/getGuest";
import { SignUpDetails } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import { Database } from "@/types/supabase.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const { baseTextColor } = useTheme().colors as ThemeProps["colors"];
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

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
      isGuest: false,
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

  const handleRegister = async (data: SignUpDetails) => {
    try {
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY as string
      );

      const { username, email, password, isGuest } = data;
      const { error } = await supabaseAdmin.auth.admin.createUser({
        user_metadata: {
          username: username === "" ? null : username,
          is_guest: isGuest,
        },
        email: email,
        password: password,
        email_confirm: true,
      });
      if (error) {
        setIsLoading(false);
        toast.error(error.message);
      } else {
        toast.success("Create user successful !");
      }
      router.refresh();
    } catch (error) {
      toast.error("Can't connect to server");
      throw new Error("Can't find server!");
    }
  };

  const handleSignIn = async (data: SignUpDetails) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setIsLoading(false);
      toast.error(error.message);
    } else {
      toast.success("Login successful !");
    }
    router.refresh();
  };

  // Event handlers
  const onUserSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    event?.preventDefault();
    setIsLoading(true);

    if (variant === "REGISTER") {
      handleRegister(data as SignUpDetails).then(
        () => {
          setTimeout(() => {
            handleSignIn(data as SignUpDetails);
          }, 10000);
        },
        () => {}
      );
    } else if (variant === "LOGIN") {
      handleSignIn(data as SignUpDetails);
    }
  };

  const onGuestSubmit = async (event: React.MouseEvent) => {
    event?.preventDefault();
    const guestData = getGuest();

    const data: SignUpDetails = {
      username: "",
      email: guestData.email,
      password: guestData.password,
      isGuest: false,
    };

    handleSignIn(data);
  };

  return (
    <form
      className="flex flex-col space-y-5 my-2"
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
        <div className="mt-4 flex w-full justify-between space-x-4">
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
              onClick={onGuestSubmit}
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
