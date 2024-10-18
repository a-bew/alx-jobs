// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { exampleApi } from '../services/exampleApi';
import { apiSlice } from '@/redux/authentication/api/apiSlice';
import notificationReducer from '@/redux/notification/notificationSlice';
import authSliceReducer from '@/redux/authentication/features/authSlice'


export const store = configureStore({
  reducer: {
    [exampleApi.reducerPath]: exampleApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Add other reducers here
    auth: authSliceReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
