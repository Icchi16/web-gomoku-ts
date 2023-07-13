import type { ButtonStyleTypes } from "@material-tailwind/react";

export interface ThemeProps {
  themeId: number;
  colors: {
    primaryColor: string;
    secondaryColor: string;
    successColor: string;
    textColor: string;
    dangerColor: string;
    warningColor: string;
    boxVariant1: string;
    boxVariant2: string;
    markVariant1: string;
    markVariant2: string;
    bgColor1: string;
    bgColor2: string;
  };
}

export const themes: ThemeProps[] = [
  {
    themeId: 0,
    colors: {
      primaryColor: "#f09f42",
      secondaryColor: "#f39782",
      successColor: "#7daa4c",
      textColor: "#f8f6ef",
      boxVariant1: "#7f3743",
      boxVariant2: "#e4a5aa",
      markVariant1: "#76a053",
      markVariant2: "#d87d5a",
      dangerColor: "#fb9a14",
      warningColor: "#f44336",
      bgColor1: "#d6d6d6",
      bgColor2: "#2c2d36",
    },
  },

  {
    themeId: 1,
    colors: {
      primaryColor: "#938CAD",
      secondaryColor: "#4d5f85",
      successColor: "#5da366",
      textColor: "#f8f6ef",
      boxVariant1: "#e7e8ea",
      boxVariant2: "#c4c4c4",
      markVariant1: "#4d5f85",
      markVariant2: "#3d4961",
      dangerColor: "#da932e",
      warningColor: "#f44336",
      bgColor1: "#4d5f85",
      bgColor2: "#3d4961",
      // "#524e55"
    },
  },

  {
    themeId: 2,
    colors: {
      primaryColor: "#b4b097",
      secondaryColor: "#545863",
      successColor: "#6baf65",
      textColor: "#f8f6ef",
      boxVariant1: "#f8f6ef",
      boxVariant2: "#D1D5DB",
      markVariant1: "#9A5D5D",
      markVariant2: "#B3856E",
      dangerColor: "#f44336",
      warningColor: "#e99f2d",
      bgColor1: "#545863",
      bgColor2: "#3f4145",
    },
  },

  {
    themeId: 3,
    colors: {
      primaryColor: "#f09f42",
      secondaryColor: "#f39782",
      successColor: "#7daa4c",
      textColor: "#f8f6ef",
      boxVariant1: "#faf9f5",
      boxVariant2: "#D1D5DB",
      markVariant1: "#699BD7",
      markVariant2: "#216DD3",
      dangerColor: "#fb9a14",
      warningColor: "#f44336",
      bgColor1: "#216dd3",
      bgColor2: "#1e57a3",
      // "#524e55"
    },
  },

  {
    themeId: 4,
    colors: {
      primaryColor: "#f09f42",
      secondaryColor: "#f39782",
      successColor: "#7daa4c",
      textColor: "#f8f6ef",
      boxVariant1: "#f8f6ef",
      boxVariant2: "#D1D5DB",
      markVariant1: "#F39782",
      markVariant2: "#B07389",
      dangerColor: "#fb9a14",
      warningColor: "#f44336",
      bgColor1: "#6d6274",
      bgColor2: "#524e55",
      // "#524e55"
    },
  },

  {
    themeId: 5,
    colors: {
      primaryColor: "#f09f42",
      secondaryColor: "#f39782",
      successColor: "#7daa4c",
      textColor: "#f8f6ef",
      boxVariant1: "#faf9f5",
      boxVariant2: "#D1D5DB",
      markVariant1: "#699BD7",
      markVariant2: "#216DD3",
      dangerColor: "#fb9a14",
      warningColor: "#f44336",
      bgColor1: "#216dd3",
      bgColor2: "#1e57a3",
      // "#524e55"
    },
  },
];
