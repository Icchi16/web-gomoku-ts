import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { UserDetails } from "@/types/types";
import { Avatar } from "@material-tailwind/react";

const UserProfiles = () => {
  const { baseTextColor } = useTheme().colors;
  const { userDetails } = useUser();
  const username = userDetails?.username;
  const isGuest = userDetails?.is_guest;
  const avatar = userDetails?.avatar;

  return (
    <div>
      <div className="flex space-x-4 items-center">
        <Avatar
          size="xl"
          alt="avatar"
          src={avatar ? avatar : "/placeholder.png"}
          className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
        />
        <div
          className="text-white flex flex-col flex-1 items-center"
          style={{ color: baseTextColor }}
        >
          <div className="text-sm text-center">Welcome to Kombat</div>
          <div className="text-xl font-bold uppercase">
            {" "}
            {isGuest ? username : `#${username}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfiles;
