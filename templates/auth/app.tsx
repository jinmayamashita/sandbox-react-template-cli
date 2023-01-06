import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./modules/auth/hooks/useAuth";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export default ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
