const getGuest = () => {
  const characters = "abcdefghijklmopqrstuvwxyz0123456789";

  const genString = () => {
    let result = "";
    const charactersLength = characters.length;
    for (let index = 0; index < 5; index++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const guestData = {
    email: `${genString()}@${genString()}.com`,
    password: "123456",
  };

  return guestData;
};

export default getGuest;
