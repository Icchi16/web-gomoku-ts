import { useUser } from "@/hooks/useUser";
import { UserDetails } from "../../../types/types";
import Button from "@/components/Button";
import UserProfiles from "./userProfiles/UserProfile";

const ProfileBoard = () => {
  const listData = [
    { key: "1", Icon: <div />, variant: "border", content: <div></div> },
  ];

  return (
    <div className="flex flex-col text-white">
      <UserProfiles />
      <div className="flex flex-col space-y-6">
        <Button variant="filled" fullWidth>
          Play against Computer
        </Button>
        <Button variant="filled" fullWidth>
          Play against Human
        </Button>
        <Button variant="filled" fullWidth>
          Check Leaderboard
        </Button>
        <Button variant="filled" fullWidth>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default ProfileBoard;
