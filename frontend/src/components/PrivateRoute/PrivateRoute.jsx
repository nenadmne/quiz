import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { removeUserToken } from "../../util/removeItem";
import { redirectHome } from "../../util/redirects";
import { getUserToken } from "../../util/getItem";

export default function PrivateRoute({ element }) {
  const token = getUserToken();

  useEffect(() => {
    if (!token) {
      redirectHome();
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        removeUserToken();
        redirectHome();
      }
    }
  }, [token]);

  return element;
}
