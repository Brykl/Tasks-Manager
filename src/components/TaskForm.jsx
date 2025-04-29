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
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function TaskForm() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const [titleCard, setTitleCard] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(formattedDate);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [id, setId] = useState(uuidv4());

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        titleCard === "" ||
        description === "" ||
        deadline === "" ||
        status === ""
      ) {
        throw new Error("Все поля должны быть заполнены!");
      }

      const newTask = {
        id,
        title: titleCard,
        description,
        deadline,
        status,
      };

      const response = await axios.post("http://localhost:3030/notes", newTask);

      console.log("Задача успешно отправлена:", response.data);

      // Очистка формы
      setTitleCard("");
      setDescription("");
      setDeadline(formattedDate);
      setStatus("");
      setError("");
      setId(uuidv4());
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      setError("Не удалось отправить задачу");
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
        margin="normal"
      />
      <TextField
        id="date"
        label="Deadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
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
