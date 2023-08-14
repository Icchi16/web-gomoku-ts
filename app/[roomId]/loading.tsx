import MainBody from "@/components/body/MainBody";
import BoardLoading from "@/components/body/boardGame/BoardLoading";

const Loading = () => {
  return (
    <MainBody>
      <div className="flex h-full w-full justify-center items-center">
          <BoardLoading />
      </div>
    </MainBody>
  );
};

export default Loading;
