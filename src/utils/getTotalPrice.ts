import { CartItemProps } from "../redux/cart/types"

export const getTotalPrice = (items: CartItemProps[]) => {
  return items.reduce((sum, item) => {
    return item.price * item.count + sum
  }, 0)
}