import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import { ArrowLeft, CartClear, CartPage } from '../components/SVG';
import { clearItems } from '../redux/cart/slice';
import { selectCart } from '../redux/cart/selectors';

const Cart: React.FC = () => {
  const { totalPrice, items } = useSelector(selectCart);
  const dispatch = useDispatch();
  const cartClear = () => {
    dispatch(clearItems());
  };
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  if (!totalCount) {
    return <EmptyCart />;
  }
  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartPage />
            Корзина
          </h2>
          <div onClick={cartClear} className="cart__clear">
            <CartClear />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount} шт.</b>
            </span>
            <span>
              Сумма заказа: <b>{totalPrice} ₽</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <ArrowLeft />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
