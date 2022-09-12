import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router';
import Cart from './pages/Cart';
import PizzaPage from './pages/PizzaPage';
import MainLayer from './components/MainLayer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayer />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaPage />} />
      </Route>
    </Routes>
  );
}

export default App;
