import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import Home from "@/components/pages/home";

const queryClient = new QueryClient();

const User = () => {
  const { data } = useQuery(["user"], () =>
    fetch("/get_user")
      .then((res) => res.json())
      .then((data) => data)
  );
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

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

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
};
