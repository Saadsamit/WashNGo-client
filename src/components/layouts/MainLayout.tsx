import { Outlet } from 'react-router-dom';
import Navbar from './../ui/Navbar/Navbar';
import Footer from '../ui/Footer/Footer';

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className="min-h-[calc(100vh-437px)]">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
