import { IPizzaBlock } from "../../models";

export type Params = {
  category: string
  sortType: string
  order: string
  search: string
  currentPage: number
}

export interface PizzaSlice {
  items: IPizzaBlock[];
  status: 'loading' | 'success' | 'error' | 'idle'
}