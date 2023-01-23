import { configureStore } from '@reduxjs/toolkit';
import modal from 'app/module/modalSlice';
import select from 'app/module/selectSlice';

export const store = configureStore({
  reducer: {
    modal,
    select,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
