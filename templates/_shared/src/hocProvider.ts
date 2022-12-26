type HOC = (component: React.ComponentType) => () => React.ComponentType

class HOCProvider {
  protected hocs: HOC[] = []

  registerHOC(hoc: HOC) {
    this.hocs.push(hoc)
  }

  getHOCs(): HOC[] {
    return this.hocs
  }
}

export default new HOCProvider()