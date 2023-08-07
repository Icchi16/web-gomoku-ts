import getCurrentUser from "./getCurrentUser";
import supabase from "@/libs/supabase";

const getBoard = async (roomId: string) => {
  try {
    const currentUser = getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const room = await supabase.auth.getSession();

    return room;
  } catch {}
};

export default getBoard;
