import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

const publicPages = import.meta.glob("./pages/public/**/*.tsx");
const secretPages = import.meta.glob([
  "./pages/**/*.tsx",
  "!**/public/**/*.tsx",
]);

// Creating routes via the all files in pages folder
function routes(modules: Record<string, any>) {
  return Object.keys(modules).map((path) => ({
    path: path
      .replace(/(.\/pages|\/public|.tsx)/g, "")
      .replace(/\[(.*)\]/, ":$1"),
    Component: lazy(
      () =>
        import(
          /* @vite-ignore */
          path
        )
    ),
  }));
}

const Home = lazy(() => import("./pages/public/home"));

// Routes
export default () => {
  return (
    <Suspense>
      <Switch>
        {[...routes(publicPages), ...routes(secretPages)].map(
          ({ path, Component }) => {
            return (
              <Route key={path} path={path}>
                {(props) => <Component {...props} />}
              </Route>
            );
          }
        )}
        <Route path="/">
          <Home />
        </Route>
        <Route>404</Route>
      </Switch>
    </Suspense>
  );
};
