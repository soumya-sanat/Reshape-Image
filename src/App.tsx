import { Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import Loader from './components/common/loader';
import { ThemeProvider } from '@/components/theme-provider';
import PageNotFound from './pages/page-not-found';
import './styles/active.css';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/auth"
          lazy={async () => {
            const { default: Component } = await import('./layout/auth-layout');
            return { Component };
          }}>
          <Route
            path="login"
            lazy={async () => {
              const { default: Component } = await import('./pages/auth/login');
              return { Component };
            }}
          />
          <Route
            path="signup"
            lazy={async () => {
              const { default: Component } = await import('./pages/auth/signup');
              return { Component };
            }}
          />
        </Route>

        <Route
          path="/"
          lazy={async () => {
            const { default: Component } = await import('./layout/root-layout');
            return { Component, errorElement: <PageNotFound /> };
          }}>
          <Route
            index
            lazy={async () => {
              const { default: Component } = await import('./pages/home');
              return { Component };
            }}
          />
          <Route
            path="blog"
            lazy={async () => {
              const { default: Component } = await import('./pages/blog');
              return { Component };
            }}
          />
          <Route
            path="about"
            lazy={async () => {
              const { default: Component } = await import('./pages/about');
              return { Component };
            }}
          />
          <Route
            path="contact"
            lazy={async () => {
              const { default: Component } = await import('./pages/contact');
              return { Component };
            }}
          />
        </Route>
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

export default App;

/* <Route path="compress" element={<ImageResizerCompressor />} />  */

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
