"use client";

import InputComp from "@/components/Input";
import { useState } from "react";

const AuthForm = () => {
  return (
    <div className="flex flex-col space-y-5">
      <p className=" text-left text-gray-900 text text-xl font-semibold">
        Register
      </p>
      <div className="flex flex-col space-y-4">
        <InputComp label="Name" />
        <InputComp label="Password" />
      </div>
    </div>
  );
};

export default AuthForm;
