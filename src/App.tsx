import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// TODO: Separate mock api per app
// import Apps from "./apps/rest-app";
import Apps from "./apps/graphql-app";

const queryClient = new QueryClient();

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Apps />
    </QueryClientProvider>
  );
};
