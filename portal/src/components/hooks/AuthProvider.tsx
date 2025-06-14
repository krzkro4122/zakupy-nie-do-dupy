import { isUserLoggedIn, login, logout, type AuthResponse } from "../../utilities/authentication";
import { useContext, createContext, useState, type PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  isLoggedIn: boolean;
  loginAction: (authMethod: string, credentials?: any) => Promise<AuthResponse>;
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
    const authInformation = await login(authMethod, credentials);
    setIsLoggedIn(isUserLoggedIn());
    navigate('/');
    return authInformation;
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