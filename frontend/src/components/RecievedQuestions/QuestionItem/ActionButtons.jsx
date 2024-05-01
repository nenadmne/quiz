import { useState } from "react";

import EditModal from "../../Modals/EditModal";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/Done";
import CreateIcon from "@mui/icons-material/ModeEdit";
import { Tooltip } from "@mui/material";

const style = {
  cursor: "pointer",
  borderRadius: "50%",
  border: "1px solid white",
  padding: "0.5rem",
  fontSize: "2.5rem",
};

export default function ActionButtons({ item, deleteHandler, addHandler }) {
  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  return (
    <div className="flex flex-col justify-between gap-6">
      <Tooltip title="Edit question">
        <CreateIcon style={style} onClick={handleEditOpen} />
      </Tooltip>
      <Tooltip title="Accept question">
        <CheckCircleIcon style={style} onClick={addHandler} />
      </Tooltip>
      <Tooltip title="Remove question">
        <DeleteIcon style={style} onClick={deleteHandler} />
      </Tooltip>
      {editOpen && (
        <EditModal open={editOpen} handleClose={handleEditClose} item={item} />
      )}
    </div>
  );
}
