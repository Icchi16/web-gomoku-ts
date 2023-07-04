import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/themes/MaterialUIServerSide";
import Sidebar from "@/components/sidebar/Sidebar";

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
    <html lang="en">
      <body className={inter.className}>
        <Sidebar />
        <div>
          <main className="fixed inset-0 left-80">{children}</main>
        </div>
      </body>
    </html>
  );
}
