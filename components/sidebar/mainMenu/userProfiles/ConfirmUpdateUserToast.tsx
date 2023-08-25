"use client";

import Button from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { ThemeProps } from "@/themes/theme";
import { UpdateProfileDetails, UserDetails } from "@/types/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ToastOptions, toast } from "react-toastify";
import { error } from "console";
import { Database } from "@/types/supabase.types";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export const updateUserToastProps = (theme: ThemeProps["colors"]) => {
  const toastProps: ToastOptions = {
    toastId: "update-profile",
    style: { backgroundColor: theme.baseTextColor },
    autoClose: false,
    closeOnClick: false,
    draggable: false,
    closeButton: false,
    pauseOnHover: true,
  };

  return toastProps;
};

interface ConfirmUpdateUserToastProps {
  userUpdateData: UpdateProfileDetails;
}

const UploadErrorToast: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div>
      <div>Cannot upload to server! Details:</div>
      <div>{error}</div>
    </div>
  );
};

const ConfirmUpdateUserToast: React.FC<ConfirmUpdateUserToastProps> = ({
  userUpdateData: data,
}) => {
  const { avatar: avatarFile, password, username, id } = data;
  const { user } = useUser();
  const { bgColor1 } = useTheme().colors;
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();

  const handleAccept = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (avatarFile) {
      const { data: uploadedAvatar, error: uploadError } =
        await supabase.storage
          .from("public")
          .upload(`avatar/${id}.png`, avatarFile, {
            cacheControl: "3600",
            upsert: true,
          });

      if (uploadError) {
        toast.error(<UploadErrorToast error={uploadError.message} />);
        throw new Error("Cannot upload to server!");
      } else {
        const avatar =
          process.env.NEXT_PUBLIC_SUPABASE_AVATAR_STORAGE +
          "/" +
          uploadedAvatar.path;

        const { error } = await supabase.auth.updateUser({
          data: {
            // ...user?.user_metadata,
            avatar: avatar,
          },
        });
        if (error) {
          toast.error(<UploadErrorToast error={error.message} />);
          throw new Error("Cannot upload to server!");
        }
      }
    }

    if (password) {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      if (error) {
        toast.error(<UploadErrorToast error={error.message} />);
        throw new Error("Cannot upload to server!");
      }
    }

    if (username) {
      const { error } = await supabase.auth.updateUser({
        data: {
          ...user?.user_metadata,
          username: username,
        },
      });
      if (error) {
        toast.error(<UploadErrorToast error={error.message} />);
        throw new Error("Cannot upload to server!");
      }
    }
    
    toast.dismiss("update-profile");
    router.refresh();
  };

  const handleRefuse = () => {
    toast.dismiss("update-profile");
  };

  return (
    <div
      style={{ color: bgColor1 }}
      className="
        flex
        flex-col
        space-y-4
        px-2
        py
        "
    >
      <div className="text-center">Do you want to update your profile ?</div>
      <div className="flex justify-center items-center space-x-3">
        <div className="flex-1">
          <Button variant="filled" success fullWidth onClick={handleAccept}>
            Yes
          </Button>
        </div>
        <div className="flex-1">
          <Button variant="filled" danger fullWidth onClick={handleRefuse}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpdateUserToast;
