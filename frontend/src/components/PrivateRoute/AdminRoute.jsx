import { useEffect } from "react";
import { getAdminToken } from "../../util/getItem";
import { redirectAdmin } from "../../util/redirects";

export default function AdminRoute({ element }) {
  const token = getAdminToken();

  useEffect(() => {
    if (!token) {
      redirectAdmin();
    }
  }, [token]);

  return element;
}
