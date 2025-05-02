import {
  Box,
  Typography,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function TaskForm({ onTaskAdded }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(formattedDate);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !deadline || !status) {
      setError("Все поля должны быть заполнены!");
      return;
    }

    try {
      await axios.post("http://localhost:3030/user/:userId/notes", {
        id: uuidv4(),
        title,
        description,
        deadline,
        status,
      });
      setTitle("");
      setDescription("");
      setDeadline(formattedDate);
      setStatus("");
      setError("");

      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (err) {
      console.error(err);
      setError("Ошибка при отправке задачи");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}>
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        margin="normal"
      />
      <TextField
        type="date"
        label="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
}

export default TaskForm;
