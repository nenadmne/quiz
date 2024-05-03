export const getUserToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getAdminToken = () => {
  const token = localStorage.getItem("admin");
  return token;
};

export const getUsername = () => {
  const username = localStorage.getItem("username");
  return username;
};

export const getGameroom = () => {
  const gameroom = localStorage.getItem("gameroom");
  return gameroom;
};

export const getAnon = () => {
  const anon = localStorage.getItem("anon");
  return anon;
};
