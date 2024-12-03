import { createSlice } from '@reduxjs/toolkit';

// Load tasks from localStorage or initialize to an empty array
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: savedTasks,
    filter: 'all', // Default filter is 'all'
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = { id: Date.now(), ...action.payload };
      state.tasks.push(newTask);
      // Save the updated tasks to localStorage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
        // Save the updated tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      // Save the updated tasks to localStorage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setFilter: (state, action) => {
      state.filter = action.payload; // Update the filter state
    },
    toggleTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = newStatus === 'completed'; // Update task status
        // Save the updated tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    updateTaskOrder: (state, action) => {
      state.tasks = action.payload; // Update the tasks order
      // Save the updated tasks to localStorage
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, editTask, deleteTask, setFilter, toggleTaskStatus, updateTaskOrder } =
  tasksSlice.actions;

export default tasksSlice.reducer;
