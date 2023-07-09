"use client";

import EmptyState from "@/components/EmptyState";
import { useTheme } from "@material-tailwind/react";

export default function Home() {
  const theme = useTheme();
  const { bgColor1 } = theme.colors;

  return (
    <div
      style={{ backgroundColor: bgColor1 }}
      className="flex justify-center items-center h-full p-8"
    >
      <EmptyState />
    </div>
  );
}
