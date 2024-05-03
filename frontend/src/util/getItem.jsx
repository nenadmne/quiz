export const getUserToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
