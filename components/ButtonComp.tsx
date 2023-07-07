"use client";

import { Button } from "@material-tailwind/react";
import { ReactNode } from "react";

const ButtonComp = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Button fullWidth>{children}</Button>
    </div>
  );
};

export default ButtonComp;
