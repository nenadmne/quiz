import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import Loading from "../Loading";
import quizApi from "../../api/api";

const columns = [
  { field: "id", headerName: "User ID", width: 120 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "email", headerName: "Email address", width: 200 },
];

export default function UsersTable() {
  const [users, setUsers] = useState(null);
  const [rows, setRows] = useState([]);

  // Fetch users from database
  const fetchUsers = async () => {
    try {
      const response = await quizApi.get("/users");
      const usersData = response.data;
      setUsers(usersData.users);
    } catch (error) {
      console.error("Error:", error);
      throw new Error(error.response.data.message || "Failed to fetch users!");
    }
  };

  // Setting table rows data after fetching users
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
    <div className="flex items-center justify-center flex-grow w-full md:w-[500px]">
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
        />
      ) : (
        <Loading
          className="flex flex-col gap-4 items-center justify-center"
          color="text-black"
        />
      )}
    </div>
  );
}
