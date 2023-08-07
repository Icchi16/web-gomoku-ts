import MainBody from "@/components/body/MainBody";
import Board from "@/components/body/boardGame/Board";
import Header from "@/components/body/header/Header";

interface RoomParams {
  roomId: string;
}

export default async function RoomId({ params }: { params: RoomParams }) {
  const { roomId } = params;

  
  return (
    <MainBody>
      <div className="flex justify-center flex-col">
        <Header />
        <div className="text-white">{roomId}</div>
      </div>
      <div className="flex h-full justify-center items-center mx-20">
        <Board />
      </div>
    </MainBody>
  );
}
