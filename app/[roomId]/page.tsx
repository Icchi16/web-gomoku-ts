import getCurrentUser from "@/actions/getCurrentUser";
import getRoomById from "@/actions/getRoomById";
import Board from "@/components/body/boardGame/Board";
import Header from "@/components/body/header/Header";
import { BoxValueProps } from "@/types/types";

interface RoomParams {
  roomId: string;
}

export interface RoomData {
  roomId: string | null;
  currentPlayer?: string | null;
  players: [] | null;
  lastPlayed?: any;
  isOver?: boolean;
}

export interface BoardData {
  boardId: number | null;
  boxData: BoxValueProps[] | null;
}

export default async function RoomId({ params }: { params: RoomParams }) {
  const { roomId } = params;
  const currentRoom = await getRoomById(roomId);

  const roomData: RoomData = {
    roomId: currentRoom?.id,
    currentPlayer: currentRoom?.current_player,
    players: currentRoom.players,
  };

  const boardData: BoardData = {
    boardId: currentRoom?.board.id,
    boxData: JSON.parse(currentRoom?.board.board_data),
  };

  return (
    <>
      <div className="flex justify-center flex-col">
        <Header />
        {/* <div className="text-white">{}</div> */}
      </div>
      <div className="flex h-full justify-center items-center mx-20">
        <Board boardData={boardData} roomData={roomData} />
      </div>
    </>
  );
}
