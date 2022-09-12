import { Outlet } from 'react-router';
import Header from './Header';

const MainLayer = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayer;
