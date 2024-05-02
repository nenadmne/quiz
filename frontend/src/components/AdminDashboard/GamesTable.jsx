import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Loading from "../Loading";

const columns = [
  { field: "id", headerName: "Game ID", width: 70 },
  { field: "player1", headerName: "Player 1", width: 130 },
  { field: "player2", headerName: "Player 2", width: 130 },
  { field: "result", headerName: "Result", width: 200 },
];

export default function GamesTable({ games }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (games) {
      setRows(
        games.map((item) => ({
          id: item._id,
          player1: item.player1,
          player2: item.player2,
          result: item.result,
        }))
      );
    }
  }, [games]);

  return (
    <div className="flex items-center justify-center flex-grow w-[500px]">
      {games ? (
        <DataGrid
          rows={rows}
          columns={columns}
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
  );
}
