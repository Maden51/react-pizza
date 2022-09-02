import { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { IPizzaBlock } from '../models';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setCategoryId, setSortType, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios';

export default function Home() {
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const [pizzas, setPizzas] = useState<IPizzaBlock[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortType = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get<IPizzaBlock[]>(
        `https://62ed2d76818ab252b60bc1c0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`,
      )
      .then((res) => {
        setPizzas(res.data);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  const items = pizzas.map((obj) => <PizzaBlock key={obj.id} pizza={obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClick={(id: number) => dispatch(setCategoryId(id))} />
        <Sort
          value={sort}
          onClick={(i: any) => {
            dispatch(setSortType(i));
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{loading ? skeletons : items}</div>
      <Pagination onChangePage={(i: number) => dispatch(setCurrentPage(i))} />
    </div>
  );
}
