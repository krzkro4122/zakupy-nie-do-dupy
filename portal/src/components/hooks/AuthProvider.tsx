import { isUserLoggedIn, login, logout, type AuthResult } from "../../utilities/authentication";
import { useContext, createContext, useState, type PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  isLoggedIn: boolean;
  loginAction: (authMethod: string, credentials?: any) => Promise<AuthResult | undefined>;
  logoutAction: () => void;
}

const AuthContext = createContext<AuthContextValue>({} as any);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  useEffect(() => {
    setIsLoggedIn(isUserLoggedIn());
  });

  const loginAction = async (authMethod: string, credentials?: any) => {
    const loginRepsonse = await login(authMethod, credentials);
    if (!loginRepsonse || !loginRepsonse.error) {
      setIsLoggedIn(isUserLoggedIn());
      navigate('/');
    }
    return loginRepsonse;
  }

  const logoutAction = () => {
    logout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};