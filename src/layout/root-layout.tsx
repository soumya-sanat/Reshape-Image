import { lazy } from 'react';
import { Outlet } from 'react-router-dom';

const Header = lazy(() =>
  import('@/components/navigation/header').then((module) => ({
    default: module.Header
  }))
);

const Footer = lazy(() =>
  import('@/components/navigation/footer').then((module) => ({
    default: module.Footer
  }))
);

const RootLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
