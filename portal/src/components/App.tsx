import { Header } from './Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes';
import { Login } from './Login';
import { Products } from './Products';
import { Logout } from './Logout';
import { Main } from './Main';
import { useEffect, useState } from 'react';
import { getUserAuthInformation } from '../utilities/authentication';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authInformation = getUserAuthInformation();
    setIsLoggedIn(authInformation?.isLoggedIn || false);
  });

  return (
    <>
      <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Header>
        <Main>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/' element={<Products />} />
              {/* <Route path='/users' element={<Users />} /> */}
              <Route path='/logout' element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
            </Route>
            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Main>
      </Router>
    </>
  );
};
