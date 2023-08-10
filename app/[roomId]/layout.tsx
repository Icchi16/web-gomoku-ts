import MainBody from "@/components/body/MainBody";
import { ReactNode, Suspense } from "react";
import Loading from "./loading";
export default function RoomLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
