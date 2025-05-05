import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  open,
  onClose,
  title,
  description,
  onConfirm,
}) {
  const [currentTitle, setCurrentTitle] = React.useState(title);
  const [currentDescribe, setCurrentDescribe] = React.useState(description);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(currentTitle, currentDescribe);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <TextField
          label="Title"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <TextField
            label="Description"
            value={currentDescribe}
            onChange={(e) => setCurrentDescribe(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отменить</Button>
        <Button onClick={handleConfirm}>Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
}
