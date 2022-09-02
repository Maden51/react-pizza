import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CartSlice {
  items: Array<{
    id: number,
    categodyId: number,
    imageUrl: string,
    price: number,
    type: string,
    size: number
  }>;
  totalPrice: number;
}

const initialState: CartSlice = {
  items: [],
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<any>) {
      state.items.push(action.payload);
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price + sum
      }, 0)
    },
    removeItem(state, action) {
      state.items.filter(item => item.id !== action.payload)
    },
    clearItems(state) {
      state.items = [];
    }
  }
})

export const {addItem, removeItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer