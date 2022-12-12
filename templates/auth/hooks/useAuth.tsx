import { createContext, useContext, PropsWithChildren, useState } from "react";
import { Redirect, Route, RouteProps } from "wouter";

const AuthContext = createContext<boolean | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
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

export const PrivateRoute = ({ path, children }: RouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect to="/login" />;
  return <Route path={path}>{children}</Route>;
};
