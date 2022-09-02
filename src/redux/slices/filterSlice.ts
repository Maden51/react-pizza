import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface FilterState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: FilterState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
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
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    }
  },
})

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } = filterSlice.actions

export default filterSlice.reducer  