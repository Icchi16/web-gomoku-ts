import type { ButtonStyleTypes } from "@material-tailwind/react";

export const theme1 = {
  button: <ButtonStyleTypes>{
    valid: {
      colors: ["cuz"],
    },
    styles: {
      variants: {
        filled: {
          cuz: {
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
  primaryTheme: "cuz",
  // primaryColor: "#f09f42",
  // successColor: "#7daa4c",
  // boxVariant1: "#6d6274",
  // boxVariant2: "#524e55",
  // markVariant1: "#F39782",
  // markVariant2: "#B07389",
  // dangerColor: "#fb9a14",
  // warningColor: "#f44336",
  // bgColor: "#F8F6EF",
};
