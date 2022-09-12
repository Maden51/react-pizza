import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

interface CartSlice {
  items: Array<{
    id: number,
    categodyId: number,
    imageUrl: string,
    title: string,
    price: number,
    type: string,
    size: number,
    count?: number,
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
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if(findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }

      state.totalPrice = state.items.reduce((sum, item) => {
            return item.price * item.count + sum
          }, 0)
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if(findItem && findItem.count > 0) {
        findItem.count--;
      } 

      state.totalPrice = state.items.reduce((sum, item) => {
            return item.price * item.count + sum
          }, 0)
    } ,

    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id)
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  }
})

export const selectCart = (state: RootState) => state.cart;

export const {addItem, minusItem, removeItem, clearItems} = cartSlice.actions;

export default cartSlice.reducer