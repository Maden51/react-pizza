export type SortProps = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
}

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: SortProps;
}