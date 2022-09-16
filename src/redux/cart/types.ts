export type CartItemProps = {
  id: number;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  title: string;
  count?: number;
}

export interface CartSlice {
  items: CartItemProps[];
  totalPrice: number;
}