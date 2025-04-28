import { Box } from "@mui/material";
import "./App.css";
import MainPage from "./pages/mainPage";

function App() {
  return (
    <>
      <Box sx={{ maxHeight: "100vh", maxWidth: "100vw" }}>
        <MainPage />
      </Box>
    </>
  );
}

export default App;
