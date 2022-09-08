import { useEffect, useRef } from 'react';
import Categories from '../components/Categories';
import Sort, { sortTypes } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { fetchItems } from '../redux/slices/pizzaSlice';

export default function Home() {
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter,
  );

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const fetchPizzas = async () => {
    // setLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortType = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    const params = { category, sortType, order, search, currentPage };

    dispatch(fetchItems(params));

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

  const pizzaItems = items.map((obj) => <PizzaBlock key={obj.id} pizza={obj} />);

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
      <div className="content__items">{status === 'loading' ? skeletons : pizzaItems}</div>
      <Pagination onChangePage={(i: number) => dispatch(setCurrentPage(i))} />
    </div>
  );
}
