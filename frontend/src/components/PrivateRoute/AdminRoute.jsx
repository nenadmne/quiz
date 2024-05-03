import { useEffect } from "react";
import { getAdminToken } from "../../util/getItem";

export default function AdminRoute({ element }) {
  const token = getAdminToken();

  useEffect(() => {
    if (!token) {
      window.location.href = "/administrator";
    }
  }, [token]);

  return element;
}
