import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import DefaultAppBar from "../components/AppBar";
import { useNavigate } from "react-router-dom";
import login from "../services/login";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginErr("");

    try {
      const data = await login(username, password);
      console.log(data.message);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const message =
          error.response.data.error ||
          error.response.data.message ||
          "Неизвестная ошибка";

        setLoginErr(message);
      } else {
        setLoginErr("Произошла ошибка при входе");
      }
    }
  };

  return (
    <>
      <DefaultAppBar AuthStatus="login" />
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
        {loginErr && (
          <>
            <Typography sx={{ color: "red" }}>{loginErr}</Typography>
          </>
        )}
        <Typography variant="h5" textAlign="center">
          Войти
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

export default Login;
