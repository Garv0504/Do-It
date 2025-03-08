import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task, WeatherData } from '../../types';

const WEATHER_API_KEY = 'YOUR_API_KEY'; // Note: In production, this should be in .env
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherForTask = createAsyncThunk(
  'tasks/fetchWeather',
  async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { data } = await axios.get(
        `${WEATHER_API_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );

      return {
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      } as WeatherData;
    } catch (error) {
      console.error('Error fetching weather:', error);
      return null;
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: JSON.parse(localStorage.getItem('tasks') || '[]') as Task[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {
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
  },
});

export const { addTask, deleteTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;