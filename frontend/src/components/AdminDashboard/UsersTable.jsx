import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Loading from "../Loading";

const columns = [
  { field: "id", headerName: "User ID", width: 120 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email address", width: 200 },
];

export default function UsersTable() {
  const [users, setUsers] = useState(null);
  const [rows, setRows] = useState([]);

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

  useEffect(() => {
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
  }, [users]);

  return (
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
  );
}
