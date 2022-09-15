import logoSvg from '../assets/img/pizza-logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/slices/cartSlice';
import { Cart } from './SVG';
import { useEffect, useRef } from 'react';

const Header: React.FC = () => {
  const { totalPrice, items } = useSelector(selectCart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const location = useLocation();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className="header__cart">
          {location.pathname === '/cart' ? null : (
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice}</span>
              <div className="button__delimiter"></div>
              <Cart />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
