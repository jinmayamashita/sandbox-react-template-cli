import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Example = () => {
  const { data } = useQuery(["user"], () =>
    fetch("/get_user")
      .then((res) => res.json())
      .then((data) => data)
  );
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
};
