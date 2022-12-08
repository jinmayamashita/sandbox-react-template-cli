import { Route, Switch } from "wouter";
import Home from "@/components/pages/home";
import User from "@/components/pages/user";

const Routes = () => {
  return (
    <Switch>
      <Route path="/user">
        <User />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Route>404</Route>
    </Switch>
  );
};

export default Routes;
