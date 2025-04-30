import { Box } from "@mui/material";
import "./App.css";
import MainPage from "./pages/mainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Box sx={{ maxHeight: "100vh", maxWidth: "100vw" }}>
        <Router>
          <Routes>
            <Route path="/notes" element={<MainPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
