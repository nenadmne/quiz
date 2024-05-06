import { useState, useEffect } from "react";
import { getUserToken, getUsername } from "../../util/getItem";

import Loading from "../Loading";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const style = {
  position: "absolute",
  maxHeight: "500px",
  width: "600px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  display: "flex",
  overflow: "hidden",
  flexDirection: "column",
  gap: 1,
};

export default function ProfileModal({ open, handleClose }) {
  const username = getUsername();
  const token = getUserToken();
  const [userInfo, setUserInfo] = useState(null);
  const [history, setHistory] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch("https://quiz-wy28.onrender.com/userInfo", {
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
    <PrivateRoute
      element={
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {history !== null ? (
            <Box sx={style}>
              <div className="flex justify-center items-center bg-blue bg-lineGrad text-white rounded shadow-black shadow-md mb-4">
                <strong className="text-[2rem] uppercase text-shadow">
                  {username}
                </strong>
              </div>
              {history.length > 0 ? (
                <ul className="text-[1.5rem] flex flex-row gap-4 text-center">
                  <li className="text-white bg-dark bg-lineGrad px-4 py-2 w-full rounded-xl text-shadow shadow-[grey] shadow-md">{`Win: ${
                    userInfo?.win || "0"
                  }`}</li>
                  <li className="text-white bg-dark bg-lineGrad px-4 py-2 w-full rounded-xl text-shadow shadow-[grey] shadow-md">{`Draw: ${
                    userInfo?.draw || "0"
                  }`}</li>
                  <li className="text-white bg-dark bg-lineGrad px-4 py-2 w-full rounded-xl text-shadow shadow-[grey] shadow-md">{`Lost: ${
                    userInfo?.loss || "0"
                  }`}</li>
                </ul>
              ) : (
                <p className="flex flex-col gap-4 items-center justify-center w-full italic">
                  <span>No games to display...</span>
                  <SmartToyIcon
                    sx={{
                      fontSize: "5rem",
                      padding: "0.5rem",
                      borderRadius: "50%",
                      background: "black",
                      color: "white",
                    }}
                  />
                </p>
              )}
              {history.length > 0 && (
                <div className="flex justify-center items-center mt-2">
                  <span className="text-[1.75rem] text-white text-shadow uppercase tracking-[5px]">
                    Match History
                  </span>
                </div>
              )}

              <ul className="text-[1.25rem] flex flex-col w-full gap-3 overflow-y-scroll  max-h-[400px] p-2">
                {history.reverse().map((item) => (
                  <li
                    key={item._id}
                    className="flex flex-row gap-1 py-1 text-shadow text-white bg-lineGrad bg-blue px-4 rounded shadow-black shadow-md"
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
                    <div className="w-full flex justify-end">
                      <span
                        className={
                          item.result !== "Draw"
                            ? item.result?.includes(username)
                              ? "text-[green]"
                              : "text-[red]"
                            : ""
                        }
                      >
                        {item.result !== "Draw"
                          ? item.result?.includes(username)
                            ? "Won"
                            : "Loss"
                          : "Draw"}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Box>
          ) : (
            <Loading className="w-full h-full flex flex-col gap-4 justify-center items-center bg-black opacity-70" />
          )}
        </Modal>
      }
    />
  );
}
