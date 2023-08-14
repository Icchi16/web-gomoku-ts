import MainBody from "@/components/body/MainBody";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";
import BoardLoading from "@/components/body/boardGame/BoardLoading";
export default function RoomLayout({ children }: { children: ReactNode }) {
  return <div className="h-full">{children}</div>;
}
