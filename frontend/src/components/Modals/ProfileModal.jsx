import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
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
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    if (open) {
      fetchUserInfo();
    }
  }, [open]);

  console.log(userInfo);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-center items-center">
          <strong className="text-[2rem] uppercase">{username}</strong>
        </div>
        <div>
          <ul className="text-[1.5rem] flex flex-row justify-between">
            <li className="text-[green]">{`Win: ${userInfo?.win || "0"}`}</li>
            <li className="text-[black]">{`Draw: ${userInfo?.draw || "0"}`}</li>
            <li className="text-[red]">{`Lost: ${userInfo?.loss || "0"}`}</li>
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <span className="text-[2rem]">Match History</span>
        </div>
      </Box>
    </Modal>
  );
}
