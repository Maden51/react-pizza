import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { IPizzaBlock } from "../../models";


interface Params {
  category: string
  sortType: string
  order: string
  search: string
  currentPage: number
}

export const fetchItems = createAsyncThunk<IPizzaBlock | any, Params>(
  'pizza/fetchPizzaStates',
  async (params) => {
    const {category, sortType, order, search, currentPage} = params
    const { data } = await axios.get(
      `https://62ed2d76818ab252b60bc1c0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`,
    );
    return data;
  }
)

export interface PizzaSlice {
  items: Array<{
    id: number,
    category: number,
    imageUrl: string,
    title: string,
    price: number,
    types: Array<number>;
    sizes: Array<number>;
    rating: number;
  }>;
  status: 'idle' | 'loading' | 'succeded' | 'failed';
}

const initialState:PizzaSlice  = {
  items: [],
  status: 'idle'
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeded';
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = 'failed';
      state.items = [];
    });
  }
})

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer