export interface ThemeProps {
  themeId: number | null;
  colors: {
    primaryColor: string;
    primaryShadow: string;
    primaryTextColor: string;
    baseTextColor: string;
    markVariant1: string;
    markVariant2: string;
    bgColor1: string;
    bgColor2: string;
    border: string;
  };
}

export const themes: ThemeProps[] = [
  {
    themeId: 0,
    colors: {
      primaryColor: "#61624f",
      primaryShadow: "#61624f54",
      primaryTextColor: "#1b1b1b",
      baseTextColor: "#c7c392",
      markVariant1: "#b53462",
      markVariant2: "#c7c392",
      bgColor1: "#1b1b1b",
      bgColor2: "#111111",
      border: "#472a45",
    },
  },

  {
    themeId: 1,
    colors: {
      primaryColor: "#646862",
      primaryShadow: "#64686256",
      primaryTextColor: "#373b35",
      baseTextColor: "#dcdcdc",
      markVariant1: "#afc99d",
      markVariant2: "#cf7f7f",
      bgColor1: "#383c36",
      bgColor2: "#2c2c2c",
      border: "#4f564a",
    },
  },

  {
    themeId: 2,
    colors: {
      primaryColor: "#808f9e",
      primaryShadow: "#808f9e56",
      primaryTextColor: "#0d151d",
      baseTextColor: "#bcd0e1",
      markVariant1: "#41a3cd",
      markVariant2: "#cf3f3f",
      bgColor1: "#0d151d",
      bgColor2: "#090d11",
      border: "#2c3942",
    },
  },

  {
    themeId: 3,
    colors: {
      primaryColor: "#666666",
      primaryShadow: "#33333352",
      primaryTextColor: "#333333",
      baseTextColor: "#e9e9e9",
      markVariant1: "#d87f37",
      markVariant2: "#3f7fab",
      bgColor1: "#333333",
      bgColor2: "#3b3b3b",
      border: "#545454",
    },
  },

  {
    themeId: 4,
    colors: {
      primaryColor: "#5a5a5a",
      primaryShadow: "#57575754",
      primaryTextColor: "#e4e4e4",
      baseTextColor: "#7b7b7b",
      markVariant1: "#8ebf77",
      markVariant2: "#7fabc7",
      bgColor1: "#f9f9f9",
      bgColor2: "#f0f0f0",
      border: "#e2e2e2",
    },
  },

  {
    themeId: 5,
    colors: {
      primaryColor: "#636668",
      primaryShadow: "#7e848654",
      primaryTextColor: "#ececec",
      baseTextColor: "#797979",
      markVariant1: "#f0c064",
      markVariant2: "#d7999e",
      bgColor1: "#ffffff",
      bgColor2: "#f1f1f1",
      border: "#ebebeb",
    },
  },
];

export const opacity = {
  0: "00",
  10: "1a",
  20: "33",
  30: "4d",
  40: "66",
  50: "80",
  60: "99",
  70: "b3",
  80: "cc",
  90: "e6",
  100: "ff",
};
