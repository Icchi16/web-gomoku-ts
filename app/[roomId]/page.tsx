import getCurrentUser from "@/actions/getCurrentUser";
import getRoomById from "@/actions/getRoomById";
import getSession from "@/actions/getSessionServer";
import MainBody from "@/components/body/MainBody";
import Board from "@/components/body/boardGame/Board";
import Header from "@/components/body/header/Header";

interface RoomParams {
  roomId: string;
}

export default async function RoomId({ params }: { params: RoomParams }) {
  const { roomId } = params;
  const currentUser = await getCurrentUser();
  const currentRoom = await getRoomById(roomId);
  const boardData = currentRoom?.board;

  const players = currentRoom.players;
  const currentPlayer = JSON.parse(currentRoom.current_player).id;

  return (
    <>
      <div className="flex justify-center flex-col">
        <Header />
        <div className="text-white">{JSON.stringify(currentPlayer)}</div>
      </div>
      <div className="flex h-full justify-center items-center mx-20">
        <Board
          boardData={boardData}
          players={players}
          currentPlayer={currentPlayer}
        />
      </div>
    </>
  );
}
