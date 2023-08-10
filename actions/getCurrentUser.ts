import getSession from "./getSessionServer";

const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.data.session?.user) {
      return null;
    }
    return session?.data.session?.user;
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;
