
import { configureStore } from '@reduxjs/toolkit';
import { fridgeApi } from './fridgeApi';

export const store = configureStore({
  reducer: {
    [fridgeApi.reducerPath]: fridgeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fridgeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
