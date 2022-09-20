import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router';
import { MainLayer } from './components';
import React, { Suspense } from 'react';

const Cart = React.lazy(() => import('./pages/Cart'));
const PizzaPage = React.lazy(() => import('./pages/PizzaPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayer />}>
        <Route path="" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PizzaPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
