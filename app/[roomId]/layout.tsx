import MainBody from "@/components/body/MainBody";
import { ReactNode } from "react";
export default function RoomLayout({ children }: { children: ReactNode }) {
  return <MainBody>{children}</MainBody>;
}
