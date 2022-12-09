import { createContext, useContext, PropsWithChildren, useState } from "react";

const AuthContext = createContext<boolean | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const isAuthenticated = useContext(AuthContext);
  // TODO: implement a function
  const login = () => {};
  // TODO: implement a function
  const logout = () => {};
  return {
    isAuthenticated,
    login,
    logout,
  } as const;
};
