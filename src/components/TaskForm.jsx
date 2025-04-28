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

function TaskForm() {
  const [titleCard, setTitleCard] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState(""); // Состояние для ошибки

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      // Проверка на пустые поля
      if (
        titleCard === "" ||
        description === "" ||
        deadline === "" ||
        status === ""
      ) {
        throw new Error("Все поля должны быть заполнены!");
      }

      // Если все поля заполнены, можно выполнить отправку
      console.log({ titleCard, description, deadline, status });

      // Очистка формы после отправки
      setTitleCard("");
      setDescription("");
      setDeadline("");
      setStatus("");
      setError(""); // Очистка ошибки, если все поля заполнены
    } catch (error) {
      // Обработка ошибки
      setError(error.message); // Устанавливаем сообщение ошибки
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
        margin="normal"
      />
      <TextField
        label="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
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
