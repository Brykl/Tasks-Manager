import { Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MainPage from "./pages/mainPage";
import "./index.css";
import { checkToken } from "./services/checkToken";
import { useEffect, useState } from "react";

function App() {
  const [tokenStatus, setTokenStatus] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await checkToken();
        setTokenStatus(res.success);
        setUserName(res.user.username);
        console.log("Токен валиден:", res);
        console.log("статус токена:", res.success);
      } catch (err) {
        setTokenStatus(false);
        console.error("Ошибка токена:", err.message);
      }
    };
    verifyToken();
  }, []);

  if (tokenStatus === null) {
    return <Box>Проверка токена...</Box>;
  }

  return (
    <Box sx={{ height: "100vh", width: "100vw", margin: 0 }}>
      <Router>
        <Routes>
          <Route path="/notes" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:userName/notes" element={<MainPage />} />
          <Route path="/user/:userName" element={<Profile />} />
          <Route
            path="/"
            element={
              tokenStatus === true ? (
                <Navigate to={`/user/${userName}`} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
