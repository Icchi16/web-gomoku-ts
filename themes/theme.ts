import type { ButtonStyleTypes } from "@material-tailwind/react";

export const theme1 = {
  button: <ButtonStyleTypes>{
    // valid: {
    //   colors: ["cus"],
    // },
    styles: {
      variants: {
        filled: {
          cus: {
            active: "active:opacity-[0.85] active:shadow-none",
            backgroud: "bg-amber-500",
            color: "text-black",
            focus: "focus:opacity-[0.85] focus:shadow-none",
            hover: "hover:shadow-lg hover:shadow-amber-500/40",
            shadow: "shadow-md shadow-amber-500/20",
          },
        },
      },
    },
  },
  primaryColor: "purple",
};
