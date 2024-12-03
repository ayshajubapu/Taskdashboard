import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, toggleTaskStatus } from "../features/tasks/tasksSlice";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import { Box, Typography, Paper, Button, Grid, Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material";

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();
  const [currentTask, setCurrentTask] = useState(null);

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // 'all'
  });

  const handleStatusChange = (taskId, newStatus) => {
    dispatch(toggleTaskStatus({ taskId, newStatus }));
  };

  return (
    <Box sx={{ padding: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Task Dashboard
      </Typography>

      {/* Task Form for adding or editing tasks */}
      <TaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} />

      {/* Filter Bar for managing task filters */}
      <FilterBar filter={filter} setFilter={(filter) => dispatch(setFilter(filter))} />

      {/* Task List displaying filtered tasks */}
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        {filteredTasks.map((task) => (
          <Grid item xs={12} md={6} key={task.id}>
            <Paper elevation={3} sx={{ padding: "15px" }}>
              <Typography variant="h6">{task.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {task.description}
              </Typography>
              <Typography variant="body2">
                <strong>Due:</strong> {task.dueDate}
              </Typography>

              {/* Buttons for Pending/Completed */}
              <FormControl component="fieldset" sx={{ marginTop: "10px" }}>
                <RadioGroup
                  row
                  value={task.completed ? "completed" : "pending"} // Ensure boolean is converted to string
                  onChange={(e) => handleStatusChange(task.id, e.target.value === "completed")}
                >
                  <FormControlLabel
                    value="completed"
                    control={<Radio />}
                    label="Completed"
                  />
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                variant="outlined"
                size="small"
                onClick={() => setCurrentTask(task)} // Set current task to edit
                sx={{ marginTop: "10px" }}
              >
                Edit
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskDashboard;
