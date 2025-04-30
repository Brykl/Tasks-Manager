import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import DefaultAppBar from "../components/AppBar";
import registerUser from "../services/registrationOnServer";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerErr, setRegisterErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterErr("");

    try {
      const data = await registerUser(username, password);
      console.log("Успешная регистрация:", data);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const message =
          error.response.data.error ||
          error.response.data.message ||
          "Неизвестная ошибка";

        setRegisterErr(message);
      } else {
        setRegisterErr("Произошла ошибка при регистрации");
      }
    }
  };

  return (
    <>
      <DefaultAppBar AuthStatus="register" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          width: 300,
          gap: 2,
        }}
      >
        {registerErr && (
          <>
            <Typography sx={{ color: "red" }}>{registerErr}</Typography>
          </>
        )}
        <Typography variant="h5" textAlign="center">
          Регистрация
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Отправить
        </Button>
      </Box>
    </>
  );
}

export default Register;
