import { IPizzaItem } from '../../models';
import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../../redux/slices/cartSlice';
import { Delete, Minus, Plus } from '../SVG';

const CartItem: React.FC<IPizzaItem> = (item) => {
  const dispatch = useDispatch();

  const plusItem = () => {
    dispatch(addItem({ id: item.id }));
  };
  const minusPizza = () => {
    dispatch(minusItem({ id: item.id }));
  };
  const removePizza = () => {
    dispatch(removeItem({ id: item.id }));
  };
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={item.imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{item.title}</h3>
        <p>
          {item.type}, {item.size} см.
        </p>
      </div>
      <div className="cart__item-count">
        <div
          onClick={minusPizza}
          className="button button--outline button--circle cart__item-count-minus">
          <Minus />
        </div>
        <b>{item.count}</b>
        <div
          onClick={plusItem}
          className="button button--outline button--circle cart__item-count-plus">
          <Plus />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{item.price * item.count}</b>
      </div>
      <div className="cart__item-remove">
        <div onClick={removePizza} className="button button--outline button--circle">
          <Delete />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
