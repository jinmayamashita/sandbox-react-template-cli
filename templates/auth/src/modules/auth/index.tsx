import { AuthProvider } from "./hooks/useAuth";
import hocProvider from "../../hocProvider";
import routerConfig from '../../router/config'
import Login from "./pages/login";
import Secret from "./pages/secret";
import { PrivateRoute } from './hooks/useAuth'

const withAuth = (Component: React.ComponentType) => () => {
  return (
    <AuthProvider>
      <Component />
    </AuthProvider>
  )
}
hocProvider.registerHOC(withAuth)

routerConfig.registerRoutes([{
  id: 'login',
  path: '/login',
  component: Login,
  private: false
}])
routerConfig.registerRoutes([{
  id: 'secret',
  path: '/secret',
  component: Secret,
  private: true
}])

routerConfig.registerPrivateRouteComponent(PrivateRoute)