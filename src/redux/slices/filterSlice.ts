import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
  categoryId: number;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: FilterState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating"
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<{name: string, sortProperty: string}>) {
      state.sort = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortType } = filterSlice.actions

export default filterSlice.reducer