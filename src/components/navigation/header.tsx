import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Menu, X } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
// import { LazyButton } from '@/components/lazy-components/lazy-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ModeToggle } from '../mode-toggle';
const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];
export const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-20 w-full h-16 max-lg:h-14">
      <nav className=" z-20  h-16 max-lg:h-14 border-b bg-white backdrop-blur md:relative dark:bg-zinc-950/50 lg:dark:bg-transparent">
        <div className="m-auto max-w-[1200px] pr-6 pl-4">
          <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <NavLink to="/" aria-label="home" className="flex items-center space-x-2">
                <img
                  src={logo}
                  className={cn('h-8 w-8 duration-200', isScrolled ? 'scale-75' : 'scale-100')}
                  alt="Logo"
                />
                <span
                  className={cn(
                    'text-lg font-bold duration-200',
                    isScrolled ? 'opacity-0' : 'opacity-100'
                  )}>
                  Image-Reshape
                </span>
              </NavLink>

              <div className="flex items-center gap-2">
                {/* Add ModeToggle in the header for mobile view */}
                <div className="lg:hidden mr-2">
                  <ModeToggle />
                </div>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                  className=" border-1 shadow-xs relative z-20 -m-2.5 -mr-4 block cursor-pointer p-1.5 rounded-md lg:hidden hover:bg-sidebar-accent">
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>
            </div>

            <div className="hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:pr-4">
                <ul className="space-y-6 text-base lg:flex lg:gap-8 lg:space-y-0 lg:text-sm">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `relative px-2 py-1 text-md transition duration-300 hover:text-primary 
            ${isActive ? 'active-link text-primary' : 'text-gray-400'}`
                      }>
                      {item.name}
                    </NavLink>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4">
                {/* Add ModeToggle in the desktop navigation */}

                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:border-l lg:pl-6">
                  <ModeToggle />
                  {/* <LazyButton asChild variant="outline" size="sm">
                    <Link to="/login">
                      <span>Login</span>
                    </Link>
                  </LazyButton>
                  <LazyButton asChild size="sm">
                    <Link to="/signup">
                      <span>Sign Up</span>
                    </Link>
                  </LazyButton> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={menuState} onOpenChange={() => setMenuState(!menuState)}>
        <DialogContent className="sm:max-w-sm rounded-2xl p-6" showCloseButton={false}>
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-lg font-semibold flex items-center justify-between gap-3">
              <img
                src={logo}
                className={cn('h-8 w-8 duration-200', isScrolled ? 'scale-75' : 'scale-100')}
                alt="Logo"
              />
              <span
                className={cn(
                  'text-lg font-bold duration-200',
                  isScrolled ? 'opacity-0' : 'opacity-100'
                )}>
                Image-Reshape
              </span>
            </DialogTitle>
            <div className="flex items-center gap-2">
              {/* Add ModeToggle in the mobile menu header */}
              <ModeToggle />
              <button
                onClick={() => setMenuState(false)}
                className=" border-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800">
                <X className="size-5" />
              </button>
            </div>
          </DialogHeader>

          <ul className="flex flex-col gap-5 mt-6 text-lg font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.href}
                  onClick={() => setMenuState(false)}
                  className="block hover:text-blue-600 transition-colors">
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 mt-6">
            {/* <LazyButton asChild variant="outline" size="sm">
              <Link to="/auth/login" onClick={() => setMenuState(false)}>
                <span>Login</span>
              </Link>
            </LazyButton>
            <LazyButton asChild size="sm">
              <Link to="/auth/signup" onClick={() => setMenuState(false)}>
                <span>Sign Up</span>
              </Link>
            </LazyButton> */}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};
