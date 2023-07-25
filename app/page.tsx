"use client";

import EmptyState from "@/components/EmptyState";
import { ThemeProps } from "@/themes/theme";
import { useTheme } from "@material-tailwind/react";
import { useEffect } from "react";

export default function Home() {
  const { bgColor1, baseTextColor } = useTheme().colors as ThemeProps["colors"];

  return (
    <div
      className="h-full bg-blue-gray-900"
      style={{ backgroundColor: bgColor1 }}
    >
      <div className="fixed inset-0 left-80">
        <div
          style={{ backgroundColor: bgColor1 }}
          className="flex justify-center items-center h-full p-8"
        >
          <EmptyState baseColor={baseTextColor} />
        </div>{" "}
      </div>{" "}
    </div>
  );
}
