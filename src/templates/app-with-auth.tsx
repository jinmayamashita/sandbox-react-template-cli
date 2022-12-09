import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "@/routes";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  );
};
