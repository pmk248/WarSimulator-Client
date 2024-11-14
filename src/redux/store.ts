import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import attackReducer from './slices/attackSlice';
import defenseReducer from './slices/defenseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    attack: attackReducer,
    defense: defenseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
