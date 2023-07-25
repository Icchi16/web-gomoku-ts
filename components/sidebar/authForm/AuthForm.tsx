"use client";

import ButtonComp from "@/components/ButtonComp";
import InputComp from "@/components/InputComp";
import { ThemeProps } from "@/themes/theme";
import { useTheme } from "@material-tailwind/react";

const AuthForm = () => {
  const { baseTextColor } = useTheme().colors as ThemeProps["colors"];

  return (
    <div className="flex flex-col space-y-5">
      <p
        className=" text-left text text-xl font-semibold"
        style={{ color: baseTextColor }}
      >
        Your nickname is:
      </p>
      <div className="flex flex-col space-y-4">
        <InputComp label="Name" />
        <InputComp type="password" label="Password" />
      </div>

      <div>
        <div className="mt-5 flex w-full justify-between space-x-4">
          <div className="flex-1">
            <ButtonComp fullWidth variant="filled">
              Login
            </ButtonComp>
          </div>
          <div className="flex-1">
            <ButtonComp fullWidth secondary variant="text">
              Play as guest
            </ButtonComp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
