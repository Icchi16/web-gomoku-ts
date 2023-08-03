import { useUser } from "@/hooks/useUser";
import { UserDetails } from "@/types/types";
import { useEffect, useState } from "react";

const UserProfiles = () => {
  const { userDetails } = useUser();
  const username = userDetails?.username;
  const avatar = userDetails?.avatar;

  return (
    <div>{username ? <div>Welcome to the Kombat {username}!</div> : <></>}</div>
  );
};

export default UserProfiles;
