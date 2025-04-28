import { Box } from "@mui/material";
import DefaultAppBar from "../components/AppBar";

function MainPage() {
  return (
    <>
      <Box sx={{ height: "10vh", width: "100vw" }}>
        <DefaultAppBar />
      </Box>
      <Box sx={{ height: "90vh", width: "100vw" }}></Box>
    </>
  );
}

export default MainPage;
