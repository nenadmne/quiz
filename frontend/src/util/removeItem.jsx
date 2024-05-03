export const removeUserToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

export const removeAdminToken = () => {
  localStorage.removeItem("admin");
};

export const removeGameroom = () => {
  localStorage.removeItem("gameroom");
};
