"use client";

import { useTheme } from "@/hooks/useTheme";
import { placeholder } from "@/public/public";
import { useModalSlice } from "@/store/modalSlice";
import { opacity } from "@/themes/theme";
import { faClose, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, Avatar, Input as MuiInput } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import Ripple from "react-ripples";
import clsx from "clsx";
import { UpdateProfileDetails } from "@/types/types";
import supabase from "@/libs/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { error } from "console";
import { toast } from "react-toastify";
import ConfirmUpdateUserToast, {
  updateUserToastProps,
} from "./ConfirmUpdateUserToast";

interface ProfilesModalProps {
  isOpen: boolean;
}

const ProfilesModal: React.FC<ProfilesModalProps> = ({ isOpen }) => {
  const handleProfileModal = useModalSlice(
    (state) => state.changeProfileModalState
  );

  const theme = useTheme().colors;
  const { userDetails } = useUser();
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();
  const supabase = useSupabaseClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getFieldState,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      "avatar-update": async () => {},
      "username-update": "",
      "password-update": "",
    },
  });

  const handleOnChange = (event: React.ChangeEvent) => {
    const file = getValues("avatar-update")[0];

    if (file && file.type.substr(0, 5) === "image") {
      setNewAvatar(file);
    } else {
      setNewAvatar(null);
    }
  };

  const onUpdateSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    const {
      "avatar-update": avatar,
      "username-update": username,
      "password-update": password,
    } = data;

    toast(
      <ConfirmUpdateUserToast
        userUpdateData={{
          avatar: avatar[0],
          username,
          password,
          id: userDetails!.id,
        }}
      />,
      updateUserToastProps(theme)
    );
  };

  useEffect(() => {
    if (newAvatar) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(newAvatar);
    }
  }, [newAvatar]);

  return (
    <Drawer
      dismiss={{
        referencePressEvent: "click",
        outsidePressEvent: "click",
        outsidePress: false,
      }}
      onClose={handleProfileModal}
      open={isOpen}
      className={clsx(
        userDetails?.is_guest && "hidden",
        "absolute left-[19rem] -z-10 bg-transparent"
      )}
      overlayProps={{ className: "fixed inset-0 -z-20 hidden " }}
    >
      <div
        className="relative h-full w-full rounded-e-2xl border-r border-y overflow-hidden"
        style={{
          borderColor: theme.baseTextColor,
        }}
      >
        <div
          className="absolute inset-0 backdrop-blur-xl -z-10"
          style={{
            backgroundColor: `${theme.bgColor2}${opacity[70]}`,
          }}
        />
        <div className="absolute top-0 right-1 rounded">
          <Button variant="text" onClick={handleProfileModal}>
            <div className="px-3 rounded flex justify-center items-center">
              <FontAwesomeIcon
                icon={faClose}
                className="text-xl"
                style={{
                  color: theme.baseTextColor,
                }}
              />
            </div>
          </Button>
        </div>
        <div
          className="flex flex-col pt-10 px-4 h-full space-y-2"
          style={{ color: theme.baseTextColor }}
        >
          <div className="text-xl font-semibold text-center">Profile Edit</div>
          <form
            action="submit"
            onSubmit={handleSubmit(onUpdateSubmit)}
            className="flex flex-col h-full space-y-5"
          >
            <div className="flex justify-center items-center space-x-2">
              <div>
                <Avatar
                  alt="avatar"
                  src={
                    preview
                      ? preview
                      : userDetails?.avatar
                      ? userDetails?.avatar
                      : placeholder
                  }
                  withBorder
                  variant="circular"
                  style={{ borderColor: theme.baseTextColor }}
                />
              </div>
              <div className="relative flex flex-1">
                <div
                  className="absolute left-1 inset-y-1 z-30 rounded "
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <Ripple className="h-full w-full">
                    <label
                      htmlFor="avatar-update"
                      className="flex items-center cursor-pointer"
                    >
                      <div className="px-[0.6rem]">
                        <FontAwesomeIcon
                          icon={faUpload}
                          style={{ color: theme.bgColor2 }}
                        />
                      </div>
                    </label>
                  </Ripple>
                </div>
                <Input
                  id="avatar-update"
                  type="file"
                  errors={errors}
                  register={register}
                  getFieldState={getFieldState}
                  getValues={getValues}
                  disableLabel
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <Input
              id="username-update"
              errors={errors}
              register={register}
              getFieldState={getFieldState}
              getValues={getValues}
              placeholder={
                userDetails?.username.replace(/['"]/g, "") ?? "Username"
              }
              type="text"
              disableLabel
            />

            <Input
              id="password-update"
              errors={errors}
              register={register}
              getFieldState={getFieldState}
              getValues={getValues}
              placeholder="New password"
              type="password"
              disableLabel
            />

            <Input
              id="password-validate"
              errors={errors}
              register={register}
              getFieldState={getFieldState}
              getValues={getValues}
              placeholder="Confirm password"
              type="password"
              disableLabel
              validate={(value, formData: FieldValues) =>
                value === formData["password-update"]
              }
              tooltipContent="Password not match"
            />

            <Button type="submit" variant="filled" fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Drawer>
  );
};

export default ProfilesModal;
