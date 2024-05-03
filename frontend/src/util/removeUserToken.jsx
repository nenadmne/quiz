export default function removeUserToken() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}
