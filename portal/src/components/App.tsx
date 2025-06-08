import PrivateRoutes from './PrivateRoutes';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { getUserAuthInformation, type UserAuthInformation } from '../utilities/authentication';
import { useState, useEffect } from 'react';
import { AuthProvider } from './hooks/AuthProvider';
import { Header } from './Header'
import { Login } from './pages/Login';
import { Main } from './Main';
import { NotFound } from './pages/NotFound';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';

import '../styles/main.css'
import '../styles/fonts.css'

export function App() {
  const [authInformation, setAuthInformation] = useState<UserAuthInformation | undefined>(undefined);

  useEffect(() => {
    const newAuthInformation = getUserAuthInformation();
    const newIsLoggedIn = newAuthInformation?.isLoggedIn;
    const isLoggedIn = authInformation?.isLoggedIn;
    if (newIsLoggedIn !== isLoggedIn) {
      setAuthInformation(authInformation);
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
