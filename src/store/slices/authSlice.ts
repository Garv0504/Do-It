import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

const initialState: User = {
  username: localStorage.getItem('username') || '',
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('username', action.payload);
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout: (state) => {
      state.username = '';
      state.isAuthenticated = false;
      localStorage.removeItem('username');
      localStorage.removeItem('isAuthenticated');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;