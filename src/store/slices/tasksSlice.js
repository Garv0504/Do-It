import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: JSON.parse(localStorage.getItem('tasks') || '[]'),
    status: 'idle',
    error: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("tasks", JSON.stringify(action.payload));
    },
    addTask: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.items));
    },
    toggleTask: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
    toggleStarTask: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) {
        task.starred = !task.starred;
        localStorage.setItem('tasks', JSON.stringify(state.items));
      }
    },
  },
});

export const { addTask, deleteTask, toggleTask, toggleStarTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;