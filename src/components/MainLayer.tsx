import { Outlet } from 'react-router';
import { Header } from '../components';

export const MainLayer: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
