import PrivateRoutes from './PrivateRoutes';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { isUserLoggedIn } from '../utilities/authentication';
import { useState, useEffect } from 'react';
import { AuthProvider } from './hooks/AuthProvider';
import { Header } from './Header'
import { Login } from './pages/Login';
import { Main } from './Main';
import { NotFound } from './pages/NotFound';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';

import './styles/main.css'
import './styles/fonts.css'

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  useEffect(() => {
    const newIsLoggedIn = isUserLoggedIn();
    if (newIsLoggedIn !== isLoggedIn) {
      setIsLoggedIn(newIsLoggedIn);
    }
  });

  return (
    <>
      <Router>
        <AuthProvider>
        <Header />
        <Main>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/' element={<Navigate to='/products' />} />
              <Route path='/products' element={<Products />} />
              <Route path='/cart' element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path='/login' element={<Login />} />
          </Routes>
        </Main>
        </AuthProvider>
      </Router>
    </>
  );
};
