import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from '../../models/Dtos';

interface AuthState {
  token: string | null;
  user: {
    id: string;
    username: string;
    role: UserRole;
    resources: { name: string; amount: number }[];
  } | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
    setUserResources: (state, action) => {
      if (state.user) {
        state.user.resources = action.payload.resources;
      }
    },
  },
});

export const { setAuth, logout, setUserResources } = authSlice.actions;
export default authSlice.reducer;
