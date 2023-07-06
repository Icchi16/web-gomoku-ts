"use client";

import BoardGame from "@/components/body/boardGame/BoardGame";
import Header from "@/components/body/header/Header";

const UserPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <Header />
      </div>
      <div className="flex h-full justify-center items-center">
        <BoardGame />
      </div>
    </>
  );
};

export default UserPage;
