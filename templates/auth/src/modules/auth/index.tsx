import { AuthProvider } from "./hooks/useAuth";
import hocProvider from "../../hocProvider";
import routerConfig from '../../router/config'
import Secret from "./pages/secret";

const withAuth = (Component: React.ComponentType) => () => {
  return (
    <AuthProvider>
      <Component />
    </AuthProvider>
  )
}
hocProvider.registerHOC(withAuth)

routerConfig.registerRoutes([{
  id: 'secret',
  path: '/secret',
  component: Secret,
  private: false
}])
