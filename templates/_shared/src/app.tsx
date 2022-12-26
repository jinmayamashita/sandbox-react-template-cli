import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from './router/Router'
import { compose } from "ramda";
import hocProvider from './hocProvider'

import.meta.glob('./modules/*/index.*', { eager: true })

const hocs = hocProvider.getHOCs()
const ComposedApp = compose.apply(null, hocs as [f1: (...args: any[]) => unknown])(Router) as React.ComponentType

const queryClient = new QueryClient();

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ComposedApp />
    </QueryClientProvider>
  );
};
