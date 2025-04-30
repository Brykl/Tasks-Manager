import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import changeStatus from "../services/statePut";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";

function Task({ task }) {
  const [currentStatus, setCurrentStatus] = React.useState(task.status);

  function deleteTask(id) {
    const dataTasks = localStorage.getItem("tasks");
    const tasks = JSON.parse(dataTasks);
    const updatedTasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  return (
    <Box sx={{ width: "100%", padding: 2, position: "relative" }}>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <CancelOutlinedIcon
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              cursor: "pointer",
              color: "gray",
              fontSize: "30px",
            }}
            onClick={() => {
              deleteTask(task.id);
            }}
          />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {task.description}
          </Typography>

          <Divider sx={{ margin: "10px 0" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              Deadline: {task.deadline}
            </Typography>
            {currentStatus === "pending" && (
              <>
                <PlayCircleFilledWhiteIcon
                  sx={{
                    position: "absolute",
                    right: 180,
                    "&:hover": {
                      color: "green",
                    },
                  }}
                  onClick={() => {
                    setCurrentStatus("in-progress");
                    changeStatus(task.id, "in-progress");
                  }}
                />
                <CheckBoxOutlineBlankOutlinedIcon
                  sx={{
                    position: "absolute",
                    right: 140,
                    cursor: "pointer",
                    color: "gray",
                    opacity: 0.7,
                  }}
                />
              </>
            )}

            {currentStatus === "in-progress" && (
              <>
                <PauseIcon
                  sx={{
                    position: "absolute",
                    right: 180,
                    "&:hover": {
                      color: "orange",
                    },
                  }}
                  onClick={() => {
                    setCurrentStatus("pending");
                    changeStatus(task.id, "pending");
                  }}
                />
                <CheckBoxOutlineBlankOutlinedIcon
                  sx={{
                    position: "absolute",
                    right: 140,
                    cursor: "pointer",
                    "&:hover": {
                      color: "green",
                    },
                  }}
                  onClick={() => {
                    setCurrentStatus("completed");
                    changeStatus(task.id, "completed");
                  }}
                />
              </>
            )}

            {currentStatus === "completed" && (
              <>
                <PlayCircleFilledWhiteIcon
                  sx={{
                    position: "absolute",
                    right: 180,
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                  onClick={() => {
                    setCurrentStatus("in-progress");
                    changeStatus(task.id, "in-progress");
                  }}
                />
                <CheckBoxOutlinedIcon
                  sx={{
                    position: "absolute",
                    right: 140,
                    cursor: "pointer",
                    color: "gray",
                    opacity: 0.7,
                  }}
                />
              </>
            )}

            <Chip
              label={currentStatus}
              color={
                currentStatus === "completed"
                  ? "success"
                  : currentStatus === "in-progress"
                  ? "warning"
                  : "default"
              }
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Task;
