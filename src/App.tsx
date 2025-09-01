import { Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import Loader from './components/common/loader';
import Home from './pages/home';
import Blog from './pages/blog';
import About from './pages/about';
import Contact from './pages/contact';
import { ThemeProvider } from '@/components/theme-provider';
import RootLayout from './layout/root-layout';
import PageNotFound from './pages/page-not-found';
// import Login from './pages/auth/login';
// import Signup from './pages/auth/signup';
import './styles/active.css';
// import AuthLayout from './layout/auth-layout';
import ImageResizerCompressor from './components/common/image-compressor';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route> */}

        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route path="/" element={<RootLayout />} errorElement={<PageNotFound />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="compress" element={<ImageResizerCompressor />} />
          {/* Explicit 404 page */}
        </Route>
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </>
    )
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense
        fallback={
          <div className="flex h-screen w-full items-center justify-center">
            <Loader />
          </div>
        }>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

// const Header = lazy(() =>
//   import("@/components/navigation/header").then((module) => ({
//     default: module.Header,
//   }))
// );

// const Layout = ({ children }: { children: React.ReactNode }) => (
//   <div className="min-h-screen">
//     <Header />
//     {children}
//     {/* <main className="pt-16 max-lg:pt-14">{children}</main> */}
//   </div>
// );

// function App() {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<RootLayout />}>
//         <Route index element={<Home />} />
//         <Route path="blog" element={<Blog />} />
//         <Route path="about" element={<About />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="*" element={<PageNotFound />} />
//       </Route>
//     )
//   );
//   return (
//     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//       <Suspense
//         fallback={
//           <div className="flex h-screen w-full items-center justify-center">
//             <Loader />
//           </div>
//         }
//       >
//         <RouterProvider router={router} />
//       </Suspense>
//     </ThemeProvider>
//   );
// }

export default App;
