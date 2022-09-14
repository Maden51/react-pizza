import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { IPizzaBlock } from '../models';

const PizzaPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<IPizzaBlock | undefined>();

  useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get<IPizzaBlock>(
          `https://62ed2d76818ab252b60bc1c0.mockapi.io/items/` + id,
        );
        setPizza(data);
      } catch {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }
    getPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="Пицца" />
      <h2>{pizza.title}</h2>
      <div>Цена : {pizza.price} </div>
    </div>
  );
};

export default PizzaPage;
