import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import DefaultAppBar from "../components/AppBar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
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
