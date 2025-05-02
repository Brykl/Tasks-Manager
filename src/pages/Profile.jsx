import { Box, Typography } from "@mui/material";
import DefaultAppBar from "../components/AppBar";
import { getUserProfile } from "../services/sendToken";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
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

  return (
    <Box sx={{ padding: 0, height: "100%" }}>
      <DefaultAppBar />
      <Box p={2}>
        <Typography variant="h5">Профиль</Typography>
        <Typography>Email: {user.username}</Typography>
      </Box>
    </Box>
  );
}
