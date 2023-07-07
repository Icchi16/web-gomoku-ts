import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/themes/MaterialUIServerSide";
import Sidebar from "@/components/sidebar/Sidebar";
import { useState } from "react";
import { theme1 } from "@/themes/theme";

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
  return (
    <ThemeProvider value={theme1}>
      <html lang="en">
        <body className={inter.className}>
          <div className="fixed inset-0 w-80 h-full">
            <Sidebar />
          </div>
          <div>
            <main className="fixed inset-0 left-80 p-8">{children}</main>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
