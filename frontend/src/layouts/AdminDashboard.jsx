import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const columns = [
  { field: "id", headerName: "User ID", width: 120 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email address", width: 200 },
];

const columns2 = [
  { field: "id", headerName: "Game ID", width: 70 },
  { field: "player1", headerName: "Player 1", width: 130 },
  { field: "player2", headerName: "Player 2", width: 130 },
  { field: "result", headerName: "Result", width: 200 },
];

export default function AdminDashboard() {
  const [users, setUsers] = useState(null);
  const [rows, setRows] = useState([]);
  const [games, setGames] = useState(null);
  const [rows2, setRows2] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users!");
      }
      const usersData = await response.json();
      setUsers(usersData.users);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred");
    }
  };

  const fetchGames = async () => {
    try {
      const response = await fetch("http://localhost:4000/matchHistory");
      if (!response.ok) {
        throw new Error("Failed to fetch users!");
      }
      const games = await response.json();
      setGames(games.matches);
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred");
    }
  };

  useEffect(() => {
    fetchGames();
    fetchUsers();
    if (users) {
      setRows(
        users.map((item) => ({
          id: item._id,
          username: item.username,
          email: item.email,
        }))
      );
    }
    if (games) {
      setRows2(
        games.map((item) => ({
          id: item._id,
          player1: item.player1,
          player2: item.player2,
          result: item.result,
        }))
      );
    }
  }, [users, games]);

  const drawGames = games && games.filter((item) => item.result === "Draw").length;
  const totalGames = games && games.length;

  return (
    <section className="flex flex-col gap-16 bg-white rounded-[1rem] p-8 max-h-[450px] overflow-y-scroll">
      <div className="flex flex-row gap-16 items-center justify-center">
        <div className="flex items-center justify-center">
          <PieChart
            series={[
              {
                data: [
                  { id: 1, value: 40, label: "Players Online" },
                  { id: 2, value: 12, label: "Active Games " },
                ],
              },
            ]}
            width={425}
            height={175}
          />
        </div>

        <div className="flex items-center justify-center flex-grow w-[500px]">
          {users ? (
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
              className="w-full"
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-16">
        {games && (
          <PieChart
            series={[
              {
                data: [
                  { id: 1, value: totalGames, label: `Games: ${totalGames}` },
                  {
                    id: 2,
                    value: drawGames,
                    label: `Draws: ${drawGames}`,
                  },
                  {
                    id: 3,
                    value: totalGames - drawGames,
                    label: `Vicotries: ${totalGames - drawGames}`,
                  },
                ],
              },
            ]}
            width={425}
            height={175}
          />
        )}
        <div className="flex items-center justify-center flex-grow w-[500px]">
          {games ? (
            <DataGrid
              rows={rows2}
              columns={columns2}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5]}
            />
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </section>
  );
}
