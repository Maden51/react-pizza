import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { IPizzaBlock } from "../../models";
import { Params } from "./types";


export const fetchItems = createAsyncThunk<IPizzaBlock[], Params>(
  'pizza/fetchPizzaStates',
  async (params) => {
    const {category, sortType, order, search, currentPage} = params
    const { data } = await axios.get<IPizzaBlock[]>(
      `https://62ed2d76818ab252b60bc1c0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`,
    );
    return data;
  }
)

export interface PizzaSlice {
  items: IPizzaBlock[];
  status: 'loading' | 'success' | 'error' | 'idle'
}

const initialState:PizzaSlice  = {
  items: [],
  status: 'idle'
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  }
})


export default pizzaSlice.reducer