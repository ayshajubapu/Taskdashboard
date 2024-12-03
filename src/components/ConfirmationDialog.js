import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ConfirmationDialog = ({ open, onConfirm, onCancel, taskTitle }) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>Delete Task</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete the task "{taskTitle}"? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;
