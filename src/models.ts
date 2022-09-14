export type IPizzaBlock = {
  id?: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export type IPizzaItem = {
  id: number;
  categodyId: number;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  title: string;
  count?: number;
}