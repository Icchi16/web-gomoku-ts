import { useTheme } from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Button } from "@material-tailwind/react";
import { useCallback, useMemo, useState } from "react";
import ProfilesModal from "./ProfilesModal";
import { placeholder } from "@/public/public";
import { useModalSlice } from "@/store/modalSlice";

const UserProfiles = () => {
  const { baseTextColor } = useTheme().colors;
  const { userDetails } = useUser();
  const username = userDetails?.username.replace(/["']/g, "");
  const isGuest = userDetails?.is_guest;
  const avatar = userDetails?.avatar;

  const handleProfilesModal = useModalSlice(
    (state) => state.changeProfileModalState
  );
  const profileModalState = useModalSlice(
    (state) => state.profileModalState
  ) as boolean;

  const handleClickAvatar = () => {
    if (!profileModalState) {
      handleProfilesModal();
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <div
          id="avatar"
          className="relative cursor-pointer"
          onClick={handleClickAvatar}
        >
          <Badge
            color="gray"
            placement="bottom-end"
            content={<FontAwesomeIcon icon={faCamera} className="text-xs" />}
            className="bottom-3 right-3 pointer-events-none"
            withBorder
          >
            <Avatar
              size="xl"
              alt="avatar"
              src={avatar ? avatar : placeholder}
              withBorder
              variant="circular"
              className=" pointer-events-none border-[3px]"
              style={{ borderColor: baseTextColor }}
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
