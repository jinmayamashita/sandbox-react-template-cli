import rpj from "read-package-json-fast";

type Modules = {
  graphql: boolean;
  auth: boolean;
  store: boolean;
  e2e: boolean;
  storybook: boolean;
  unit: boolean;
};

export async function makePackages(
  packageFile: string,
  name: string,
  modules: Modules
): Promise<any> {
  const data = await rpj(packageFile);

  const baseDependencies = [
    "react",
    "react-dom",
    "wouter",
    "@tanstack/react-query",
  ];

  const baseDevDependencies = [
    "typescript",
    "vite",
    "@vitejs/plugin-react",
    "msw",
    "prettier",
  ];

  const moduleDependencies = [
    modules.graphql && ["graphql", "graphql-request"],
  ].flat();

  const moduleDevDependencies = [
    modules.storybook && ["storybook"],
    modules.e2e && ["@playwright/test"],
    modules.unit && ["jest"],
  ].flat();

  const dependencies = Object.fromEntries(
    Object.entries(data.dependencies).filter((e) =>
      new Set([...baseDependencies, ...moduleDependencies]).has(e[0])
    )
  );

  const devDependencies = Object.fromEntries(
    Object.entries(data.devDependencies).filter((e) =>
      new Set([...baseDevDependencies, ...moduleDevDependencies]).has(e[0])
    )
  );

  return {
    // TODO: validate npm package name
    // refs. https://github.com/npm/validate-npm-package-name
    name,
    type: "module",
    private: true,
    version: "0.0.1",
    scripts: {
      dev: "vite",
      build: "tsc && vite build",
    },
    dependencies,
    devDependencies,
    msw: {
      workerDirectory: "public",
    },
  };
}
