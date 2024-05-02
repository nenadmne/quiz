import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    } else {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log(decodedToken);
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "/";
      }
    }
  }, [token]);

  return element;
}
