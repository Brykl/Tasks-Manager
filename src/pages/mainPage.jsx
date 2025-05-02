import { Box, Typography } from "@mui/material";
import DefaultAppBar from "../components/AppBar";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MainPage() {
  const { userName } = useParams();
  const [tasks, setTasks] = useState([]);

  // Функция для загрузки задач
  const fetchTasks = () => {
    const token = localStorage.getItem("token"); // Получаем токен из localStorage

    // Заголовки для авторизации
    const headers = {
      Authorization: `Bearer ${token}`, // Добавляем Bearer токен
    };

    // Выполняем запрос для получения задач
    fetch(`http://localhost:3030/user/${userName}/notes`, { headers })
      .then((res) => res.json()) // Получаем данные в формате JSON
      .then((data) => {
        setTasks(data); // Сохраняем задачи в состояние
        console.log("📥 Загрузили задачи:", data);
      })
      .catch((err) => console.error("❌ Ошибка при загрузке задач:", err)); // Обработка ошибок
  };

  // Выполняем запрос при монтировании компонента или изменении userName
  useEffect(() => {
    fetchTasks();
  }, [userName]);

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
                Нет задач
              </Typography>
            ) : (
              tasks.map((task) => (
                <Task key={task.id} task={task} fetchTasks={fetchTasks} />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
