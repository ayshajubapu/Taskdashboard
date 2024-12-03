import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask, deleteTask } from "../features/tasks/tasksSlice";
import {
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./TaskForm.css"; // Import CSS styles for notifications

const TaskForm = ({ currentTask, setCurrentTask }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [notification, setNotification] = useState(""); // State for notification
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog

  // Populate form fields when editing a task
  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDueDate(currentTask.dueDate);
      setCompleted(currentTask.completed);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && dueDate) {
      const newTask = { title, description, dueDate, completed };

      if (currentTask) {
        // Dispatch edit task action
        dispatch(editTask({ id: currentTask.id, ...newTask }));
        setCurrentTask(null); // Clear current task after editing
        setNotification("Task updated successfully!"); // Set notification
      } else {
        // Dispatch add task action
        dispatch(addTask(newTask));
        setNotification("New task added successfully!"); // Set notification
      }

      // Reset form fields
      setTitle("");
      setDescription("");
      setDueDate("");
      setCompleted(false);

      // Clear notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const handleStatusChange = (e) => {
    setCompleted(e.target.value === "completed");
  };

  const handleCancelEdit = () => {
    setCurrentTask(null); // Exit edit mode
    setTitle("");
    setDescription("");
    setDueDate("");
    setCompleted(false);
  };

  const handleDeleteTask = () => {
    setDialogOpen(false); // Close the dialog
    if (currentTask) {
      dispatch(deleteTask(currentTask.id));
      setCurrentTask(null);
      setNotification("Task deleted successfully!"); // Set notification
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <div>
      {notification && <div className="notification">{notification}</div>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <div>
          <label htmlFor="dueDate" style={{ display: "block", marginBottom: "5px" }}>
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <FormControl component="fieldset" margin="normal">
          <RadioGroup
            row
            name="completed"
            value={completed ? "completed" : "pending"}
            onChange={handleStatusChange}
          >
            <FormControlLabel value="completed" control={<Radio />} label="Completed" />
            <FormControlLabel value="pending" control={<Radio />} label="Pending" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">
          {currentTask ? "Update Task" : "Add Task"}
        </Button>

        {currentTask && (
          <>
            <Button
              type="button"
              onClick={handleCancelEdit}
              variant="outlined"
              sx={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>

            <IconButton
              onClick={() => setDialogOpen(true)} // Open the confirmation dialog
              aria-label="delete"
              color="error"
              sx={{ marginLeft: "10px" }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the task "{currentTask?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteTask} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskForm;
