import { useContext, createContext, useState, type PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAuthInformation, login, logout } from "../../utilities/authentication";

interface AuthContextValue {
  isLoggedIn: boolean;
  loginAction: (authMethod: string, credentials?: any) => Promise<void>;
  logoutAction: () => void;
}

const AuthContext = createContext<AuthContextValue>({} as any);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const authInformation = getUserAuthInformation();

  const [isLoggedIn, setIsLoggedIn] = useState(authInformation?.isLoggedIn || false);

  useEffect(() => {
    setIsLoggedIn(getUserAuthInformation()?.isLoggedIn || false);
  });

  const loginAction = async (authMethod: string, credentials?: any) => {
    const authInformation = await login(authMethod, credentials);
    setIsLoggedIn(authInformation.isLoggedIn);
    navigate('/');
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