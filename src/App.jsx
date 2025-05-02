import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MainPage from "./pages/mainPage";
import "./index.css";

function App() {
  return (
    <Box sx={{ height: "100vh", width: "100vw", margin: 0 }}>
      <Router>
        <Routes>
          <Route path="/notes" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:userName/notes" element={<MainPage />} />
          <Route path="/user/:userName" element={<Profile />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
