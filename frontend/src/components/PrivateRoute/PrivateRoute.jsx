import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import removeUserToken from "../../util/removeUserToken";
import reloadHome from "../../util/reloadHome";

export default function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      reloadHome();
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        removeUserToken();
        reloadHome();
      }
    }
  }, [token]);

  return element;
}
