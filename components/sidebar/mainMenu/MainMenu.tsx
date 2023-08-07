import Button from "@/components/Button";
import UserProfiles from "./userProfiles/UserProfile";
import { useParams, useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  faRankingStar,
  faRobot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { NextResponse } from "next/server";
import MenuItem, { MenuItemProps } from "./MenuItem";
import { useState, useEffect } from "react";

const MainMenu = () => {
  const initialMenu: MenuItemProps[] = [
    {
      icon: faRobot,
      btnVariant: "filled",
      content: "Play against computer",
      onClick: () => {},
    },
    {
      icon: faUser,
      btnVariant: "filled",
      content: "Play against human",
      onClick: async () => {
        try {
          setMenu(inRoomMenu);
          router.push("/123114-wewer-124");
        } catch (error) {
          console.log(error);
          throw new NextResponse("Some thing went wrong!", { status: 500 });
        }
      },
    },
    {
      icon: faRankingStar,
      btnVariant: "filled",
      content: "Leaderboard",
      onClick: () => {},
    },
  ];

  //! In Room Menu
  const inRoomMenu: MenuItemProps[] = [
    {
      icon: faRobot,
      btnVariant: "filled",
      content: "Forfeit",
      onClick: () => {},
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

  useEffect(() => {
    if (param) {
      setMenu(inRoomMenu);
    }
  }, []);

  return (
    <div className="flex flex-col text-white space-y-4">
      <UserProfiles />
      <div className="flex flex-col space-y-6">
        {menu.map((data, index) => (
          <MenuItem key={index} data={data} />
        ))}

        <Button variant="filled" fullWidth onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default MainMenu;
