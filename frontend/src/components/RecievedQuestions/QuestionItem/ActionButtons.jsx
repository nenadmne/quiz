import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/Done";
import CreateIcon from "@mui/icons-material/ModeEdit";
import { Tooltip } from "@mui/material";

const style = {
  cursor: "pointer",
  borderRadius: "50%",
  border: "1px solid white",
  padding: "0.25rem",
  fontSize: "1.75rem",
};

export default function ActionButtons({ deleteHandler, addHandler }) {
  return (
    <div className="flex flex-row gap-2">
      <Tooltip title="Edit question">
        <CreateIcon style={style} />
      </Tooltip>
      <Tooltip title="Accept question">
        <CheckCircleIcon style={style} onClick={addHandler} />
      </Tooltip>
      <Tooltip title="Remove question">
        <DeleteIcon style={style} onClick={deleteHandler} />
      </Tooltip>
    </div>
  );
}
