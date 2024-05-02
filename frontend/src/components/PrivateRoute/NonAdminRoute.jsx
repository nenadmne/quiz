import { useEffect } from "react";

export default function NonAdminRoute({ element }) {
  const token = localStorage.getItem("admin");

  useEffect(() => {
    if (token) {
      window.location.href = "/administrator";
    }
  }, [token]);

  return element;
}
