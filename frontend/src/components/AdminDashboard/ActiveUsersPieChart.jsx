import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

import useSocket from "../../hooks/useSocket";

export default function ActiveUsersPieChart() {
  const [usersOnline, setUsersOnline] = useState(0);
  const [activeRooms, setActiveRooms] = useState(0);

  const socket = useSocket();

  // Handling users and active games count
  useEffect(() => {
    if (socket) {
      socket.emit("connectedUsers");
      socket.on("connectedUsers", (connectedUsers) => {
        setUsersOnline(connectedUsers);
      });
      socket.emit("activeRooms");
      socket.on("activeRooms", (activeRoomsCount) => {
        setActiveRooms(activeRoomsCount);
      });
    }
  }, [socket]);

  return (
    <PieChart
      series={[
        {
          data: [
            {
              id: 1,
              value: usersOnline,
              label: `Users online: ${usersOnline}`,
            },
            {
              id: 2,
              value: activeRooms,
              label: `In-game: ${activeRooms}`,
            },
          ],
        },
      ]}
    />
  );
}
