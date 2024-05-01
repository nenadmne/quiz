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
  { id: 6, username: "Melisandre", email: null },
  { id: 7, username: "Clifford", email: "Ferrara" },
  { id: 8, username: "Frances", email: "Rossini" },
  { id: 9, username: "Roxie", email: "Harvey" },
];

export default function AdminDashboard() {
  return (
    <section className="flex flex-row gap-8 bg-white rounded-[1rem] p-8 max-h-[464px] overflow-y-scroll">
      <div>
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
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
    </section>
  );
}
