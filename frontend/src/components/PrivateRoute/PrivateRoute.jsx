import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import removeUserToken from "../../util/removeUserToken";

export default function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        removeUserToken();
        window.location.href = "/";
      }
    }
  }, [token]);

  return element;
}
