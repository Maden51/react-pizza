import { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { IPizzaBlock } from '../models';
import PizzaSkeleton from '../components/PizzaSkeleton';

export default function Home() {
  const [pizzas, setPizzas] = useState<IPizzaBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://62ed2d76818ab252b60bc1c0.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
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
