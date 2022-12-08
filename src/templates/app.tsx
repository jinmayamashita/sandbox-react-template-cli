import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "@/routes";

const queryClient = new QueryClient();

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
};
