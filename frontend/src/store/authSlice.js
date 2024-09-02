// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, signup } from '../services/authService'; // Importe as funções do serviço

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
  const response = await login(username, password);
  return response;
});

export const signupUser = createAsyncThunk('auth/signupUser', async ({ username, email, name, city, street, neighborhood, number, cep, password }) => {
  const response = await signup({ username, email, name, city, street, neighborhood, number, cep, password });
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;