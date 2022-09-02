import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
  categoryId: number;
  currentPage: number;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: FilterState = {
  categoryId: 0,
  currentPage: 1,
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
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    }
  },
})

export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions

export default filterSlice.reducer  