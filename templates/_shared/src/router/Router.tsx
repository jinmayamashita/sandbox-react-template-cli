import { Route, Switch } from "wouter";
import Home from "../pages/home";
import User from "../pages/user";
import routerConfig from './config'

const routes = routerConfig.getRoutes()
const PrivateRouteComponent = routerConfig.getPrivateRouteComponent()

function Routes() {
  return (
    <Switch>
      {routes.map((route) => {
        const RouteComponent = route.component

        return route.private && PrivateRouteComponent ? (
          <PrivateRouteComponent path={route.path} key={route.path}>
            <RouteComponent />
          </PrivateRouteComponent>
        ) : (
          <Route path={route.path} key={route.path}>
            <RouteComponent />
          </Route>
        )
      })}
      <Route path="/user"><User /></Route>
      <Route path="/">
        <Home />
      </Route>
      <Route>404</Route>
    </Switch>
  );
}
export default Routes;
