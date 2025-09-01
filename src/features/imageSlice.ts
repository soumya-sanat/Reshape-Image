import type { Image } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: Image = {
  id: null,
  url: null,
  path: null,
  name: null,
  size: null,
  type: null,
  width: null,
  height: null,
  createdAt: null,
  updatedAt: null
};

export const imageSlice = createSlice({
  name: 'original_image',
  initialState,
  reducers: {
    setOriginalImage: (state, action: PayloadAction<Image>) => {
      return { ...state, ...action.payload };
    },
    unSetOriginalImage: () => {
      return initialState;
    }
  }
});

export const { setOriginalImage, unSetOriginalImage } = imageSlice.actions;
export default imageSlice.reducer;
