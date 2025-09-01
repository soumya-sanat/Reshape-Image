import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { imageApi } from '@/services/imageApi'; // Make sure this path is correct
import imageReducer from '@/features/imageSlice'; // Make sure this path is correct

export const store = configureStore({
  reducer: {
    [imageApi.reducerPath]: imageApi.reducer,
    image: imageReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imageApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
