import { Redirect, Route, RouteProps, Switch } from "wouter";
import Home from "@/components/pages/home";
import User from "@/components/pages/user";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  return <button onClick={login}>Login</button>;
};

const PrivateRoute = ({ path, children }: RouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect to="/login" />;
  return <Route path={path}>{children}</Route>;
};

const Routes = () => {
  return (
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <PrivateRoute path="/user">
        <User />
      </PrivateRoute>
      <Route path="/">
        <Home />
      </Route>
      <Route>404</Route>
    </Switch>
  );
};

export default Routes;
