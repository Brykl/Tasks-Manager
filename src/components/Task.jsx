import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";

function Task({ task }) {
  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {task.description}
          </Typography>

          <Divider sx={{ margin: "10px 0" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              Deadline: {task.deadline}
            </Typography>

            <Chip
              label={task.status}
              color={
                task.status === "Completed"
                  ? "success"
                  : task.status === "In Progress"
                  ? "warning"
                  : "default"
              }
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Task;
