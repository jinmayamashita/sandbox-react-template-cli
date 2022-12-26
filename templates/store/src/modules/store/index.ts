import Bear from './pages/bear'
import routerConfig from '../../router/config'

routerConfig.registerRoutes([{
  id: 'store',
  path: '/store',
  component: Bear,
  private: false
}])