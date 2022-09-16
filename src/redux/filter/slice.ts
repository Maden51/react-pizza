import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FilterSliceState, SortProps } from './types';

const initialState: FilterSliceState = {
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
    setSortType(state, action: PayloadAction<SortProps>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if(Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating'
        }
      }
    }
  },
})



export const { setCategoryId, setSortType, setCurrentPage, setSearchValue, setFilters } = filterSlice.actions

export default filterSlice.reducer  