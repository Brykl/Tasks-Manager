import { Box, Typography } from "@mui/material";
import DefaultAppBar from "../components/AppBar";
import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkToken } from "../services/checkToken";

function MainPage() {
  const { userName } = useParams();
  const [tasks, setTasks] = useState([]);
  const [trueUserName, setTrueUserName] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await checkToken();
        setTrueUserName(res.user.username);
        console.log("Токен валиден:", res);
        console.log("статус токена:", res.success);
      } catch (err) {
        console.error("Ошибка токена:", err.message);
      }
    };
    verifyToken();
  }, []);

  const fetchTasks = () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(`http://localhost:3030/user/${userName}/notes`, { headers })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log("📥 Загрузили задачи:", data);
      })
      .catch((err) => console.error("❌ Ошибка при загрузке задач:", err));
  };

  useEffect(() => {
    fetchTasks();
  }, [userName]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ flexShrink: 0 }}>
        <DefaultAppBar AuthStatus="notes" userName={trueUserName} />
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
