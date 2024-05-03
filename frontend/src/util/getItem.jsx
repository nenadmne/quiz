export const getUserToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getAdminToken = () => {
  const token = localStorage.getItem("admin");
  return token;
};
