import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop'; // your existing scroll to top
import './index.css';

// Lazy load all pages
const Home = lazy(() => import('./Pages/Home/Home'));
const ProductList = lazy(() => import('./Pages/ProductList/ProductList'));
const ProductDetails = lazy(() => import('./Pages/ProductDetails/ProductDetails'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const Checkout = lazy(() => import('./Pages/Checkout/Checkout'));
const Login = lazy(() => import('./Pages/Login/Login'));
const Signup = lazy(() => import('./Pages/SignUp/Signup'));
const Dashboard = lazy(() => import('./Pages/Dashboard/Dshboard/Dashboard'));
const ManageUsers = lazy(() => import('./Pages/Dashboard/ManageUsers/ManageUsers'));
const EditProducts = lazy(() => import('./Pages/Dashboard/EditProducts/EditProducts'));
const OrdersPage = lazy(() => import('./Pages/Dashboard/OrdersPage/OrdersPage'));
const AdminView = lazy(() => import('./Pages/Dashboard/AdminView/AdminView'));
const NotFound = lazy(() => import('./Pages/NotFound/NotFound'));
const Contact = lazy(() => import('./Pages/Contact/Contact'));
const CategoryProducts = lazy(() => import('./Pages/CategoryProducts/CategoryProducts'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPassword/ForgotPassword'));

// Layout components
const LayoutWithNavbarFooter = ({ Component }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Navbar />
    <main style={{ flex: 1 }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </main>
    <Footer />
  </div>
);

const LayoutWithFooterOnly = ({ Component }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <main style={{ flex: 1 }}>
      <Suspense fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </main>
    <Footer />
  </div>
);

const App = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <Router>
      <ScrollToTop /> {/* Scroll to top on route change */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Pages with Navbar + Footer */}
          <Route path="/" element={<LayoutWithNavbarFooter Component={Home} />} />
          <Route path="/product-list" element={<LayoutWithNavbarFooter Component={ProductList} />} />
          <Route path="/product/:id" element={<LayoutWithNavbarFooter Component={ProductDetails} />} />
          <Route path="/cart" element={<LayoutWithNavbarFooter Component={Cart} />} />
          <Route path="/checkout" element={<LayoutWithNavbarFooter Component={Checkout} />} />
          <Route path="/dashboard" element={<LayoutWithNavbarFooter Component={Dashboard} />} />
          <Route path="/dashboard/manage-users" element={<LayoutWithNavbarFooter Component={ManageUsers} />} />
          <Route path="/dashboard/edit-products" element={<LayoutWithNavbarFooter Component={EditProducts} />} />
          <Route path="/dashboard/orders" element={<LayoutWithNavbarFooter Component={OrdersPage} />} />
          <Route path="/dashboard/products" element={<LayoutWithNavbarFooter Component={AdminView} />} />
          <Route path="/contact" element={<LayoutWithNavbarFooter Component={Contact} />} />

          {/* Category products */}
          <Route path="/category-products" element={<LayoutWithNavbarFooter Component={CategoryProducts} />} />

          {/* Login, Signup & Forgot Password with Footer only */}
          <Route path="/login" element={<LayoutWithFooterOnly Component={Login} />} />
          <Route path="/signup" element={<LayoutWithFooterOnly Component={Signup} />} />
          <Route path="/forgot-password" element={<LayoutWithFooterOnly Component={ForgotPassword} />} />

          {/* NotFound with no Navbar & no Footer */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
