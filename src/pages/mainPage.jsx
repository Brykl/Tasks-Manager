import { Box } from "@mui/material";
import DefaultAppBar from "../components/AppBar";
import Task from "../components/Task";

function MainPage() {
  const task = {
    title: "Finish project report",
    description:
      "Complete the final report for the project and submit it by the end of the week.",
    deadline: "2025-04-30",
    status: "In Progress",
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ flexShrink: 0 }}>
        <DefaultAppBar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#f5f5f5",
          padding: 2,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {[...Array(7)].map((_, index) => (
            <Box
              sx={{ width: { xs: "100%", sm: "48%", md: "30%", lg: "22%" } }}
              key={index}
            >
              <Task task={task} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
