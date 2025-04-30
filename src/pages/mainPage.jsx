/* MainPage.jsx */
import { Box, Typography } from "@mui/material";
import DefaultAppBar from "../components/AppBar";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3030/notes");
      const data = await res.json();
      setTasks(data);
      console.log("📥 Загрузили задачи:", data);
    } catch (err) {
      console.error("❌ Ошибка при загрузке задач:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
          <TaskForm onTaskAdded={fetchTasks} />
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
