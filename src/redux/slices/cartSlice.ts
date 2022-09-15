import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store";

export type CartItemProps = {
  id: number;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  title: string;
  count?: number;
}

interface CartSlice {
  items: CartItemProps[];
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
    addItem(state, action: PayloadAction<CartItemProps>) {
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
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if(findItem) {
        findItem.count--;
      } 

      state.totalPrice = state.items.reduce((sum, item) => {
            return item.price * item.count + sum
          }, 0)
    } ,

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload)
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