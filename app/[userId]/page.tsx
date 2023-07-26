"use client";

import Board from "@/components/body/boardGame/Board";
import Header from "@/components/body/header/Header";
import { useTheme } from "@material-tailwind/react";

export default function UserPage() {
  const theme = useTheme();
  const { bgColor1 } = theme.colors;

  return (
    <div
      className="h-full bg-blue-gray-900"
      style={{ backgroundColor: bgColor1 }}
    >
      <div className="fixed inset-0 left-80">
        <div className="flex justify-center">
          <Header />
        </div>
        <div className="flex h-full justify-center items-center mx-20">
          <Board />
        </div>
      </div>
    </div>
  );
}
