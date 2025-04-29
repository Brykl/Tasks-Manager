import {
  Box,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Task from "./Task";
import { v4 as uuidv4 } from "uuid";

function TaskForm() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Добавляем ведущий ноль, если месяц меньше 10
  const day = today.getDate().toString().padStart(2, "0"); // Добавляем ведущий ноль, если день меньше 10

  const formattedDate = `${year}-${month}-${day}`;
  const [titleCard, setTitleCard] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(formattedDate);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [id, setId] = useState(uuidv4());

  const handleSubmit = (e) => {
    e.preventDefault();

    function addCard(titleCard, description, deadline, status, id) {
      const newTask = { titleCard, description, deadline, status, id };

      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

      tasks.unshift(newTask);

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    try {
      if (
        titleCard === "" ||
        description === "" ||
        deadline === "" ||
        status === ""
      ) {
        throw new Error("Все поля должны быть заполнены!");
      }

      console.log({ titleCard, description, deadline, status });
      addCard(titleCard, description, deadline, status, id);

      setTitleCard("");
      setDescription("");
      setDeadline(formattedDate);
      setStatus("");
      setError("");
      setId(uuidv4());
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "300px" }}>
      {error && (
        <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      <TextField
        label="Title"
        value={titleCard}
        onChange={(e) => setTitleCard(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        rowsMax={6}
        margin="normal"
      />
      <TextField
        id="date"
        label="Deadline"
        type="date"
        defaultValue={deadline}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}

export default TaskForm;
