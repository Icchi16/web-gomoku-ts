"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/themes/MaterialUIServerSide";
import Sidebar from "@/components/sidebar/Sidebar";
import { useZustandStore } from "@/store/ZutandStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Web Gomoku",
  description: "Created by SirIcchi16",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useZustandStore((state) => state.theme);

  return (
    <ThemeProvider value={theme}>
      <html lang="en">
        <body className={inter.className}>
          <div className="fixed inset-0 w-80 h-full">
            <Sidebar />
          </div>
          <div className="h-screen">
            <main className="h-full">{children}</main>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
