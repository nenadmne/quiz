import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 1) {
        clearInterval(interval);
        navigate("/");
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full transform translate-y-[-20%]">
      <h1 className="m-2 text-[3rem]"> OOPS! </h1>
      <h2 className="m-2 text-[4.5rem]"> 404 - PAGE NOT FOUND </h2>
      <p className="m-2 text-[2rem]">
        Redirecting you back on homepage in {countdown}...
      </p>
    </div>
  );
}

export default NotFound;
