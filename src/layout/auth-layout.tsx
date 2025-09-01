import { Outlet } from 'react-router-dom';

// const AuthLayout = ({ children }: { children: React.ReactNode }) => {
const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
