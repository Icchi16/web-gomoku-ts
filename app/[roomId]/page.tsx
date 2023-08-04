import MainBody from "@/components/body/MainBody";
import Board from "@/components/body/boardGame/Board";
import Header from "@/components/body/header/Header";

export default async function UserPage() {



  
  return (
    <MainBody>
      <div className="flex justify-center">
        <Header />
      </div>
      <div className="flex h-full justify-center items-center mx-20">
        <Board />
      </div>
    </MainBody>
  );
}
