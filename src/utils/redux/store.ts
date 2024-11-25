import { useDispatch } from 'react-redux';

import { groupApi } from './apiSlices/groupApiSlice/groupApi';
import { userApi } from './apiSlices/userApiSlice/userApi';
import { prefix as userPrefix, userReducer } from './storeSlices/userSlice/slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [userPrefix]: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware, groupApi.middleware)
});

export type StoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
