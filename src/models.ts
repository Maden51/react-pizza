export interface IPizzaBlock {
  id?: number;
  imageUrl: string;
  title: string;
  types: Array<number>;
  sizes: Array<number>;
  price: number;
  category: number;
  rating: number;
}

export interface ISearch {
  searchValue: string;
  setSearchValue: Function;
}