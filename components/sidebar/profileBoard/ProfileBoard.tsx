import Button from "@/components/Button";
import UserProfiles from "./userProfiles/UserProfile";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Icon, IconProp } from "@fortawesome/fontawesome-svg-core";
import { variant } from "@material-tailwind/react/types/components/button";
import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRankingStar,
  faRobot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@/hooks/useTheme";

interface buttonListProps {
  key: string;
  icon: IconProp;
  btnVariant: variant;
  onClick?: () => void;
  active?: boolean;
  content: ReactNode;
}

const ProfileBoard = () => {
  const { bgColor2, primaryColor } = useTheme().colors;
  const router = useRouter();
  const buttonList: buttonListProps[] = [
    {
      key: "1",
      icon: faRobot,
      btnVariant: "filled",
      content: "Play against computer",
      onClick: () => {},
    },
    {
      key: "2",
      icon: faUser,
      btnVariant: "filled",
      content: "Play against human",
      onClick: () => {},
    },
    {
      key: "3",
      icon: faRankingStar,
      btnVariant: "filled",
      content: "Leaderboard",
      onClick: () => {},
    },
  ];
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="flex flex-col text-white">
      <UserProfiles />
      <div className="flex flex-col space-y-6">
        {buttonList.map((comp) => (
          <Button
            key={comp.key}
            variant={comp.btnVariant}
            onClick={comp.onClick}
          >
            <div className="flex h-full py-0">
              <div className="w-14 text-xl py-0 relative">
                <div className="absolute flex items-center justify-center inset-0">
                  <FontAwesomeIcon icon={comp.icon} />
                </div>
              </div>
              <div className="flex-1 flex justify-start relative px-4 ">
                <div
                  className="absolute inset-0 -inset-y-3 rounded-e-lg border-y border-r pointer-events-none ease-in-out transition-all duration-[600ms]"
                  style={{
                    backgroundColor: bgColor2,
                    borderColor: primaryColor,
                  }}
                ></div>
                <div className="z-10 text" style={{ color: primaryColor }}>
                  {comp.content}
                </div>
              </div>
            </div>
          </Button>
        ))}

        <Button variant="filled" fullWidth onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default ProfileBoard;
