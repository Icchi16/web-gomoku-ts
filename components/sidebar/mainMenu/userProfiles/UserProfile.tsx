import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge } from "@material-tailwind/react";
import { useState } from "react";
import ProfilesModal from "./ProfilesModal";
import { placeholder } from "@/public/public";

const UserProfiles = () => {
  const { baseTextColor } = useTheme().colors;
  const { userDetails } = useUser();
  const username = userDetails?.username.replace(/["']/g, "");
  const isGuest = userDetails?.is_guest;
  const avatar = userDetails?.avatar;
  console.log(avatar);

  const [isOpen, setIsOpen] = useState(false);
  const handleClickAvatar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <ProfilesModal isOpen={isOpen} handlerOpen={handleClickAvatar} />
      <div className="flex items-center">
        <div className="relative cursor-pointer" onClick={handleClickAvatar}>
          <Badge
            color="gray"
            placement="bottom-end"
            content={<FontAwesomeIcon icon={faCamera} className="text-xs" />}
            className="bottom-3 right-3"
            withBorder
          >
            <Avatar
              size="xl"
              alt="avatar"
              src={avatar ? avatar : placeholder}
              withBorder
            />
          </Badge>
        </div>
        <div
          className="text-white flex flex-col flex-1 items-center"
          style={{ color: baseTextColor }}
        >
          <div className="text text-center">Welcome to Kombat</div>
          <div className="text-2xl font-bold">
            {isGuest ? `#${username}` : username}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfiles;
