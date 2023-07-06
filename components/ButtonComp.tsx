"use client";

import { Button } from "@material-tailwind/react";
import { ReactNode } from "react";

const ButtonComp = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <Button variant="gradient" className="w-full">
        {children}
      </Button>
    </div>
  );
};

export default ButtonComp;
