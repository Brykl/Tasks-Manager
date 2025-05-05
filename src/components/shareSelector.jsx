import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
  Alert,
} from "@mui/material";
import { Add, Remove} from "@mui/icons-material";
import { getAccessList } from "../services/getAccessList";
import { updateAccess } from "../services/sendAccessList";

export default function AccessControlPanel() {
  const [accessGranted, setAccessGranted] = useState([]);
  const [accessDenied, setAccessDenied] = useState([]);
  const [selectedToAdd, setSelectedToAdd] = useState([]);
  const [selectedToRemove, setSelectedToRemove] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccessList = async () => {
      try {
        const data = await getAccessList();
        setAccessGranted(data.accessGranted);
        setAccessDenied(data.accessDenied);
      } catch (err) {
        setError("Ошибка при получении списка доступа");
        console.error(err);
      }
    };

    fetchAccessList();
  }, []);

  const handleAddAccess = async () => {
    const usersToAdd = [...selectedToAdd];
    if (newUser.trim()) {
      usersToAdd.push(newUser.trim());
    }
    if (usersToAdd.length === 0) return;

    try {
      await updateAccess(selectedToAdd);
      setAccessGranted((prev) => [...prev, ...usersToAdd]);
      setAccessDenied((prev) =>
        prev.filter((user) => !usersToAdd.includes(user))
      );
      setSelectedToAdd([]);
      setNewUser("");
      setError("");
    } catch (err) {
      setError("Ошибка при добавлении доступа: " + err);
    }
  };

  const handleRemoveAccess = async () => {
    if (selectedToRemove.length === 0) return;

    try {
      await updateAccess(accessDenied);
      setAccessDenied((prev) => [...prev, ...selectedToRemove]);
      setAccessGranted((prev) =>
        prev.filter((user) => !selectedToRemove.includes(user))
      );
      setSelectedToRemove([]);
      setError("");
    } catch (err) {
      setError("Ошибка при удалении доступа: " + err);
    }
  };

  const toggleSelection = (user, selectedList, setSelectedList) => {
    if (selectedList.includes(user)) {
      setSelectedList(selectedList.filter((u) => u !== user));
    } else {
      setSelectedList([...selectedList, user]);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Управление доступом
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          {/* <TextField
            label="Добавить пользователя"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            fullWidth
          /> */}
          <Button
            variant="contained"
            color="success"
            onClick={handleAddAccess}
            disabled={!newUser.trim() && selectedToAdd.length === 0}
            sx={{width: '100%'}}
          >
            Добавить
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">Доступ есть</Typography>
            <List sx={{ maxHeight: 300 }}>
              {accessGranted.map((user) => (
                <ListItem
                  key={user}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() =>
                        toggleSelection(
                          user,
                          selectedToRemove,
                          setSelectedToRemove
                        )
                      }
                      color={
                        selectedToRemove.includes(user) ? "error" : "default"
                      }
                    >
                      <Remove />
                    </IconButton>
                  }
                >
                  <ListItemText primary={user} />
                </ListItem>
              ))}
            </List>
            <Button
              variant="outlined"
              color="error"
              onClick={handleRemoveAccess}
              disabled={selectedToRemove.length === 0}
              sx={{ mt: 1 }}
            >
              Удалить выбранных
            </Button>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1">Доступа нет</Typography>
            <List sx={{ maxHeight: 300, overflowY: "auto" }}>
              {accessDenied.map((user) => (
                <ListItem
                  key={user}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() =>
                        toggleSelection(user, selectedToAdd, setSelectedToAdd)
                      }
                      color={
                        selectedToAdd.includes(user) ? "success" : "default"
                      }
                    >
                      <Add />
                    </IconButton>
                  }
                >
                  <ListItemText primary={user} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
