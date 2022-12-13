import { Route, Switch } from "wouter";
import { PrivateRoute } from "../../templates/auth/src/hooks/useAuth";

// pages
import Login from "../../templates/auth/src/pages/login";
import Secret from "../../templates/auth/src/pages/secret";
import Home from "../../templates/_shared/src/pages/home";
import BearStore from "../../templates/store/src/pages/bear";
import User from "../../templates/_shared/src/pages/user";

export default () => {
  return (
    <Switch>
      <PrivateRoute path="/secret">
        <Secret />
      </PrivateRoute>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/store">
        <BearStore />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Route>404</Route>
    </Switch>
  );
};
