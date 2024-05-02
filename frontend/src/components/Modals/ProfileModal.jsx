import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Loading from "../Loading";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  maxHeight: "250px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  py: 2,
  px: 4,
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function ProfileModal({ open, handleClose }) {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch("http://localhost:4000/userInfo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming you have a token stored in localStorage
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await response.json();
        setUserInfo(data.user);
        setHistory(data.matches);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    if (open) {
      fetchUserInfo();
    }
  }, [open]);

  return (
    <PrivateRoute>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="overflow-hidden"
      >
        {history !== null ? (
          <Box sx={style} className="overflow-y-scroll">
            <div className="flex justify-center items-center">
              <strong className="text-[2rem] uppercase">{username}</strong>
            </div>
            <div>
              <ul className="text-[1.5rem] flex flex-row justify-between">
                <li className="text-[green]">{`Win: ${
                  userInfo?.win || "0"
                }`}</li>
                <li className="text-[black]">{`Draw: ${
                  userInfo?.draw || "0"
                }`}</li>
                <li className="text-[red]">{`Lost: ${
                  userInfo?.loss || "0"
                }`}</li>
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-[2rem]">Match History</span>
            </div>

            <div className="flex flex-row g-2">
              <ul className="text-[1.25rem] flex flex-col w-[300px]">
                {history.map((item) => (
                  <li
                    key={item._id}
                    className="flex flex-row gap-1 py-1 border-black border-b"
                  >
                    <span
                      className={`${
                        username === item.player1 ? "font-bold" : ""
                      }`}
                    >
                      {item.player1}
                    </span>
                    <span>-</span>
                    <span
                      className={`${
                        username === item.player2 ? "font-bold" : ""
                      }`}
                    >
                      {item.player2}
                    </span>
                  </li>
                ))}
              </ul>
              <ul className="text-[1.25rem] flex flex-col w-[100px]">
                {history.map((item) => (
                  <li
                    key={item._id}
                    className="flex flex-row gap-1 py-1 border-black border-b w-full justify-end"
                  >
                    <span
                      className={
                        item.result !== "Draw"
                          ? item.result.includes(username)
                            ? "text-[green]"
                            : "text-[red]"
                          : ""
                      }
                    >
                      {item.result !== "Draw"
                        ? item.result.includes(username)
                          ? "Won"
                          : "Loss"
                        : "Draw"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Box>
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-black opacity-60 flex-col gap-4">
            <Loading />
          </div>
        )}
      </Modal>
    </PrivateRoute>
  );
}
