import { Box, Typography } from "@mui/material";
import DefaultAppBar from "../components/AppBar";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";

function MainPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Считываем карточки из localStorage при монтировании компонента
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, [tasks]);

  // Функция для добавления задачи и обновления списка
  const addTask = (newTask) => {
    const updatedTasks = [newTask, ...tasks]; // Добавляем задачу в начало массива
    setTasks(updatedTasks); // Обновляем состояние
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Сохраняем в localStorage
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ flexShrink: 0 }}>
        <DefaultAppBar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#f5f5f5",
          padding: 2,
          overflowY: "auto",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <TaskForm addTask={addTask} />{" "}
          <Box sx={{ width: "50%" }}>
            {tasks.length === 0 ? (
              <Typography variant="h6" color="textSecondary">
                No tasks available
              </Typography>
            ) : (
              tasks.map((task, index) => <Task key={index} task={task} />)
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
