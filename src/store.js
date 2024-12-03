// store.js (or wherever your store is configured)
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks/tasksSlice';  // Correct path

const store = configureStore({
  reducer: {
    tasks: tasksReducer,  // Add tasks reducer here
  },
});

export default store;
