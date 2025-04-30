import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function DefaultAppBar({ AuthStatus }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1976d2", position: "relative" }}
      >
        <Toolbar sx={{ position: "relative", minHeight: 64 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Task Manager
          </Typography>
          {AuthStatus === "register" && (
            <Box sx={{ marginLeft: "auto" }} onClick={() => navigate("/login")}>
              <Typography sx={{ color: "white" }}>Войти</Typography>
            </Box>
          )}
          {AuthStatus === "login" && (
            <Box
              sx={{ marginLeft: "auto" }}
              onClick={() => navigate("/register")}
            >
              <Typography sx={{ color: "white" }}>регистрация</Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
