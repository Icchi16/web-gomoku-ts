import "./globals.css";
import { Inter } from "next/font/google";
import ThemeProviderClient from "@/themes/MaterialUIServerSide";
import Sidebar from "@/components/sidebar/Sidebar";
import StyledComponentsRegistry from "@/libs/StyledCompReg";

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
    <ThemeProviderClient>
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
    </ThemeProviderClient>
  );
}
