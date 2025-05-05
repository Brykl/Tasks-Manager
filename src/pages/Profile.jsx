import { Box, Typography } from "@mui/material";
import DefaultAppBar from "../components/AppBar";
import { getUserProfile } from "../services/sendToken";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddUser from "../components/shareSelector";

export default function Profile() {
  const navigate = useNavigate();
  const { userName } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserProfile(userName)
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message || "Ошибка при загрузке профиля");
      });
  }, [userName]);

  if (error) {
    return <Box style={{ color: "red" }}>Ошибка: {error}</Box>;
  }

  if (!user) {
    return <Box>Загрузка...</Box>;
  }

  // Вынесли JSX генерацию карточек в переменную, где есть доступ к `navigate`
  const accessCards = user.accessTo.map((name) => (
    <Box
      key={name}
      sx={{
        height: "100px",
        width: "100px",
        bgcolor: "blue",
        m: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": { bgcolor: "darkblue" },
      }}
      onClick={() => navigate(`/user/${name}/notes`)}
    >
      <Typography color="white">{name}</Typography>
    </Box>
  ));

  return (
    <Box sx={{ padding: 0, height: "100%" }}>
      <DefaultAppBar AuthStatus="profile" />
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <AddUser />
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            Профиль: {user.username}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Есть доступ к заметкам:
          </Typography>
          <Box display="flex" flexWrap="wrap">
            {accessCards}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
