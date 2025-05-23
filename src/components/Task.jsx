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
import deleteTask from "../services/taskDelete";
import EditIcon from "@mui/icons-material/Edit";
import AlertDialogSlide from "./editTasks";

function Task({ task, fetchTasks }) {
  const [currentStatus, setCurrentStatus] = React.useState(task.status);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [updatedTask, setUpdatedTask] = React.useState(task);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleConfirm = (newTitle, newDescription) => {
    console.log("task.id: " + task.id);
    const updated = {
      ...updatedTask,
      title: newTitle,
      description: newDescription,
    };
    setUpdatedTask(updated);

    fetch(`http://localhost:3030/notes/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Обновленная задача:", data);
        fetchTasks();
      })
      .catch((error) => {
        console.error("Ошибка при обновлении задачи:", error);
      });
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      fetchTasks();
    } catch (err) {
      console.error("Ошибка при удалении задачи:", err);
    }
  };

  return (
    <Box sx={{ width: "100%", padding: 2, position: "relative" }}>
      <AlertDialogSlide
        open={isDialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title={task.title}
        description={task.description}
      />
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
            onClick={handleDelete}
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
            <EditIcon
              sx={{
                position: "absolute",
                right: 220,
                "&:hover": {
                  color: "green",
                },
              }}
              onClick={handleOpen}
            />
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
