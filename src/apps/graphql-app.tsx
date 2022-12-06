import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const queryClient = new QueryClient();

const Example = () => {
  const { data } = useQuery(["user"], () =>
    request(
      "*",
      gql`
        query GetUser {
          name
        }
      `
    )
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
