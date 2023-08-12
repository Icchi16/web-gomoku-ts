import getRoomById from "@/actions/getRoomById";
import Board from "@/components/body/boardGame/Board";
import Header from "@/components/body/header/Header";
import { BoxValueProps } from "@/types/types";

interface RoomParams {
  roomId: string;
}

export interface RoomData {
  roomId: number | null;
  currentPlayer?: string | null;
  players: string[] | null;
  lastPlayed?: any;
  isOver?: boolean;
  boardData: BoxValueProps[];
}

export default async function RoomId({ params }: { params: RoomParams }) {
  const { roomId } = params;
  const currentRoom = await getRoomById(roomId);

  const roomData: RoomData = {
    roomId: currentRoom?.id,
    currentPlayer: currentRoom?.current_player,
    players: currentRoom?.players,
    boardData: JSON.parse(currentRoom?.board),
  };

  return (
    <>
      <div className="flex justify-center flex-col">
        <Header />
      </div>
      <div className="flex h-full justify-center items-center mx-20">
        <Board roomData={roomData} />
      </div>
    </>
  );
}
