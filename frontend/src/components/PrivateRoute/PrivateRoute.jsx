import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ element }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  return element;
}
