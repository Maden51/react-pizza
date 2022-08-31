import { useState, useEffect, useContext } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { IPizzaBlock } from '../models';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCategoryId, setSortType } from '../redux/slices/filterSlice';

export default function Home() {
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const sortType = useSelector((state: RootState) => state.filter.sort);
  const [pizzas, setPizzas] = useState<IPizzaBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchValue } = useContext(SearchContext);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(`https://62ed2d76818ab252b60bc1c0.mockapi.io/items?page=
      ${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`)
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} pizza={obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClick={(id: number) => dispatch(setCategoryId(id))} />
        <Sort
          value={sortType}
          onClick={(i: any) => {
            dispatch(setSortType(i));
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? skeletons : items}</div>
      <Pagination onChangePage={(i: number) => setCurrentPage(i)} />
    </div>
  );
}
