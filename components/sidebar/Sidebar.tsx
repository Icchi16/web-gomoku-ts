"use client";

import Image from "next/image";
import AuthForm from "./authForm/AuthForm";

const Sidebar = () => {
  return (
    <div className="h-full bg-white rounded-r-lg ">
      <div className="mx-4 flex flex-col space-y-5">
        <div className="flex flex-col items-center justify-center space-y-5 mt-5">
          <Image alt="Logo" src="/logo.jpg" height={120} width={120} />
          <div className=" border-b-2 border-gray-300 w-full rounded-lg"></div>
        </div>
        <div className="">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
