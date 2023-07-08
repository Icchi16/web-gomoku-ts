"use client";

import ButtonComp from "@/components/ButtonComp";
import InputComp from "@/components/InputComp";
import { useState } from "react";

const AuthForm = () => {
  return (
    <div className="flex flex-col space-y-5">
      <p className=" text-left text-gray-900 text text-xl font-semibold">
        Your nickname is:
      </p>
      <div className="flex flex-col space-y-4">
        <InputComp label="Name" />
      </div>
      {/* <hr className=" border-b-[1px] border-gray-300" /> */}
      <div>
        <div className="mt-5 flex w-full justify-between space-x-4">
          <div className="flex-1">
            <ButtonComp fullWidth variant="gradient">
              Register
            </ButtonComp>
          </div>
          <div className="flex-1">
            <ButtonComp fullWidth secondary>
              Play as guest
            </ButtonComp>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
