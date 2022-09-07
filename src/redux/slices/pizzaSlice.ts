import { createSlice } from "@reduxjs/toolkit"


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
}

const initialState:PizzaSlice  = {
  items: [],
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    }
  }
})

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer