import { useCallback, useEffect, useRef } from 'react';
import { Categories, Sort, PizzaBlock, Error, PizzaSkeleton, Pagination } from '../components';
import { sortTypes } from '../components/Sort';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { setCategoryId, setSortType, setCurrentPage, setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import qs from 'qs';
import { useNavigate } from 'react-router';
import { fetchItems } from '../redux/pizza/slice';
import { selectPizzaData } from '../redux/pizza/selectros';
import { SortProps } from '../redux/filter/types';

const Home: React.FC = () => {
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onChangeCategory = useCallback(
    (i: number) => {
      dispatch(setCategoryId(i));
    },
    [dispatch],
  );

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const fetchPizzas = async () => {
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
      // console.log(params);
      const sortState = sortTypes.find((obj) => obj.sortProperty === params.sortProperty);
      // console.log(sortState);
      if (sortState) {
        params.sort = sortState;
      }
      dispatch(
        setFilters({
          searchValue: String(params.search),
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch, sort]);

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

  const skeletons = [...new Array(4)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClick={onChangeCategory} />
        <Sort
          value={sort}
          onClick={(i: SortProps) => {
            dispatch(setSortType(i));
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <Error />
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzaItems}</div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(i: number) => dispatch(setCurrentPage(i))}
      />
    </div>
  );
};

export default Home;
