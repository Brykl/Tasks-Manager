import { Box, Typography } from "@mui/material";
import DefaultAppBar from "../components/AppBar";
import { getUserProfile } from "../services/sendToken";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const { userName } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  function accToCards(names) {
    return (
      <>
        {names.map((name) => (
          <Box
            key={name}
            sx={{ height: "100px", width: "100px", bgcolor: "blue", m: 1 }}
            onClick={() => navigate(`/user/${name}/notes`)}
          >
            <Typography color="white">{name}</Typography>
          </Box>
        ))}
      </>
    );
  }

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

  return (
    <Box sx={{ padding: 0, height: "100%" }}>
      <DefaultAppBar AuthStatus="profile" />
      <Box p={2}>
        <Typography variant="h5">Профиль: {user.username}</Typography>
        <Typography variant="h5">Есть доступ к заметкам:</Typography>
        {accToCards(user.accessTo)}
      </Box>
    </Box>
  );
}
