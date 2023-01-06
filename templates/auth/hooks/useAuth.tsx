import { createContext, useContext, PropsWithChildren, useState } from "react";
import { Redirect } from "wouter";

const AuthContext = createContext<boolean | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, _setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const isAuthenticated = useContext(AuthContext);

  // TODO: not yet implemented
  const login = () => console.log("login");

  // TODO: not yet implemented
  const logout = () => console.log("logout");

  return {
    isAuthenticated,
    login,
    logout,
  } as const;
};

export const PrivateComponent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect to="/login" />;
  return <>{children}</>;
};

export default AuthProvider;
