import Board from "@/components/body/boardGame/Board";
import Header from "@/components/body/header/Header";
import RoomProvider from "@/providers/RoomProvider";

interface RoomParams {
  roomId: string;
}

export default async function RoomId({ params }: { params: RoomParams }) {
  return (
    <RoomProvider>
      <div className="flex justify-center flex-col h-full">
        <Header />
        <div className="flex justify-center items-center mx-20 flex-1">
          <Board />
        </div>
      </div>
    </RoomProvider>
  );
}
