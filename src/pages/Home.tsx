import { useState, useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import Sort, { sortTypes } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { IPizzaBlock } from '../models';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { setItems } from '../redux/slices/pizzaSlice';

export default function Home() {
  const pizzas = useSelector((state: RootState) => state.pizza.items);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );
  const [loading, setLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchPizzas = async () => {
    setLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortType = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      const { data } = await axios.get<IPizzaBlock[]>(
        `https://62ed2d76818ab252b60bc1c0.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${order}${search}`,
      );
      dispatch(setItems(data));
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }

    window.scrollTo(0, 0);
  };
  // Если был первый рендер, то проверяем URL параметры и сохраняем в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortState = sortTypes.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sortState }));
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер, то переходим по параметрам
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sort, categoryId, currentPage, navigate]);

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
