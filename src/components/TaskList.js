import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../features/tasks/tasksSlice";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id} secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        }>
          <ListItemText
            primary={task.title}
            secondary={`Due Date: ${task.dueDate} | Status: ${task.completed ? "Completed" : "Pending"}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
