import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "email", headerName: "Email address", width: 230 },
];

const rows = [
  { id: 1, username: "Snow", email: "Jon" },
  { id: 2, username: "Lannister", email: "Cersei" },
  { id: 3, username: "Lannister", email: "Jaime" },
  { id: 4, username: "Stark", email: "Arya" },
  { id: 5, username: "Targaryen", email: "Daenerys" },
  { id: 6, username: "Melisandre", email: "null" },
  { id: 7, username: "Clifford", email: "Ferrara" },
  { id: 8, username: "Frances", email: "Rossini" },
  { id: 9, username: "Roxie", email: "Harvey" },
];

const columns2 = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "player1", headerName: "Player 1", width: 130 },
  { field: "player2", headerName: "Player 2", width: 130 },
  { field: "winner", headerName: "Winner", width: 130 },
];

const rows2 = [
  { id: 1, player1: "Snow", player2: "Snow", winner: "Jon" },
  { id: 2, player1: "Lannister", player2: "Snow", winner: "Cersei" },
  { id: 3, player1: "Lannister", player2: "Snow", winner: "Jaime" },
  { id: 4, player1: "Stark", player2: "Snow", winner: "Arya" },
  { id: 5, player1: "Targaryen", player2: "Snow", winner: "Daenerys" },
  { id: 6, player1: "Melisandre", player2: "Snow", winner: "null" },
  { id: 7, player1: "Clifford", player2: "Snow", winner: "Ferrara" },
  { id: 8, player1: "Frances", player2: "Snow", winner: "Rossini" },
  { id: 9, player1: "Roxie", player2: "Snow", winner: "Harvey" },
];

export default function AdminDashboard() {
  return (
    <section className="flex flex-col gap-16 bg-white rounded-[1rem] p-8 max-h-[450px] overflow-y-scroll">
      <div className="flex flex-row gap-8 items-center justify-center">
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
        <div className="flex-grow">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={5}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-8">
        <PieChart
          series={[
            {
              data: [{ id: 1, value: 200, label: "Total games" }],
            },
          ]}
          width={425}
          height={175}
        />
        <div className="flex-grow">
          <DataGrid
            rows={rows2}
            columns={columns2}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={5}
          />
        </div>
      </div>
    </section>
  );
}
