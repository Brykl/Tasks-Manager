import { Box, Typography } from "@mui/material";
import DefaultAppBar from "../components/AppBar";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import { useState, useEffect } from "react";

function MainPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3030");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      if (message.type === "notes") {
        setTasks(message.data);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socket.close();
    };
  }, []); // пустой массив зависимостей, чтобы не пересоздавать сокет на каждый ререндер

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ flexShrink: 0 }}>
        <DefaultAppBar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#f5f5f5",
          p: 2,
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <TaskForm />
          <Box sx={{ width: "50%", ml: 4 }}>
            {tasks.length === 0 ? (
              <Typography
                variant="h6"
                sx={{ fontSize: 35 }}
                color="textSecondary"
              >
                No tasks available
              </Typography>
            ) : (
              tasks.map((task) => <Task key={task.id} task={task} />)
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
