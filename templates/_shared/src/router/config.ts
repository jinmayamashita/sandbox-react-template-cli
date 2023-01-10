type Route = {
  id: string;
  path: string;
  component: React.ComponentType;
  private: boolean;
}

type PrivateRouteProps = {
  path: string;
  children: React.ReactNode;
}

export class Config {
  protected routes: Route[] = []
  protected privateRouteComponent: React.ComponentType<PrivateRouteProps> | null = null

  registerRoutes(routes: Route[]) {
    this.routes.push(...routes)
  }

  getRoutes() {
    return this.routes
  }

  registerPrivateRouteComponent(privateRouteComponent: React.ComponentType) {
    this.privateRouteComponent = privateRouteComponent
  }

  getPrivateRouteComponent() {
    return this.privateRouteComponent
  }
}

export default new Config()