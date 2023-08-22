import Button from "@/components/Button";
import UserProfiles from "./userProfiles/UserProfile";
import { useParams, useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  faDoorOpen,
  faRankingStar,
  faRobot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NextResponse } from "next/server";
import MenuItem, { MenuItemProps } from "./MenuItem";
import { useState, useEffect, useMemo } from "react";
import { useModalSlice } from "@/store/modalSlice";
import ProfilesModal from "./userProfiles/ProfilesModal";

const MainMenu = () => {
  const handleRoomModal = useModalSlice((state) => state.changeRoomModalState);

  const initialMenu: MenuItemProps[] = [
    {
      icon: faRobot,
      content: "Play against computer",
      disabled: true,
      onClick: () => {},
    },
    {
      icon: faUser,
      content: "Play against human",
      disabled: false,

      onClick: () => {
        handleRoomModal();
      },
    },
    {
      icon: faRankingStar,
      content: "Leader board",
      disabled: true,
      onClick: () => {},
    },
  ];

  //! In Room Menu
  const inRoomMenu: MenuItemProps[] = [
    {
      icon: faDoorOpen,
      content: "Forfeit",
      disabled: false,
      onClick: async () => {
        try {
          router.push("/");
        } catch (error) {
          console.log(error);
          throw new NextResponse("Some thing went wrong!", { status: 500 });
        }
      },
    },
  ];

  const [menu, setMenu] = useState(initialMenu);
  const param = useParams();
  const router = useRouter();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const isProfileModalOpen = useModalSlice((state) => state.profileModalState);

  const paramMemo = useMemo(() => {
    if (param?.roomId) {
      return true;
    } else return false;
  }, [param]);

  useEffect(() => {
    paramMemo ? setMenu(inRoomMenu) : setMenu(initialMenu);
  }, [paramMemo]);

  return (
    <div className="flex flex-col text-white relative">
      <div className="absolute -top-6 -bottom-[1.65rem] inset-x-0 -z-10">
        <ProfilesModal isOpen={isProfileModalOpen} />
      </div>
      <div className="mb-4">
        <UserProfiles />
      </div>

      <div className="flex flex-col space-y-6 ">
        {menu.map((menuProps, index) => (
          <MenuItem
            key={index}
            icon={menuProps.icon}
            content={menuProps.content}
            disabled={menuProps.disabled}
            onClick={menuProps.onClick}
          />
        ))}

        <Button variant="filled" fullWidth onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default MainMenu;
