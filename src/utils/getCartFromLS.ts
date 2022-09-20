import { CartItemProps } from "../redux/cart/types";
import { getTotalPrice } from "./";

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = getTotalPrice(items);
  return {
    items: items as CartItemProps[],
    totalPrice,
  }
}