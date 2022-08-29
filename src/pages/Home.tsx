import { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { IPizzaBlock } from '../models';
import PizzaSkeleton from '../components/PizzaSkeleton';

export default function Home() {
  const [pizzas, setPizzas] = useState<IPizzaBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategodyId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating"
  });

  useEffect(() => {
    setLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    fetch(`https://62ed2d76818ab252b60bc1c0.mockapi.io/items?${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${order}`)
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClick={(id: number) => setCategodyId(id)}  />
        <Sort value={sortType} onClick={(i: any) => {setSortType(i)}} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((obj) => <PizzaBlock key={obj.id} pizza={obj} />)}
      </div>
    </div>
  );
}
