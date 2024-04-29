import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/Done";
import CreateIcon from "@mui/icons-material/ModeEdit";
import { Tooltip } from "@mui/material";

export default function ActionButtons() {
  return (
    <div className="flex flex-row gap-2">
      <Tooltip title="Edit question">
        <CreateIcon style={{ cursor: "pointer" }} />
      </Tooltip>
      <Tooltip title="Accept question">
        <CheckCircleIcon style={{ cursor: "pointer" }} />
      </Tooltip>
      <Tooltip title="Remove question">
        <DeleteIcon style={{ cursor: "pointer" }} />
      </Tooltip>
    </div>
  );
}
