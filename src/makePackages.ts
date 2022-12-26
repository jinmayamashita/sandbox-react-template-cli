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
    "ramda",
  ];

  const baseDevDependencies = [
    "typescript",
    "vite",
    "@vitejs/plugin-react",
    "msw",
    "prettier",
    "@types/ramda",
  ];

  const moduleDependencies = [
    modules.graphql && ["graphql", "graphql-request"],
  ].flat();

  const moduleDevDependencies = [
    modules.storybook && [
      "@babel/core",
      "@storybook/addon-actions",
      "@storybook/addon-essentials",
      "@storybook/addon-interactions",
      "@storybook/addon-links",
      "@storybook/builder-vite",
      "@storybook/react",
      "@storybook/testing-library",
    ],
    modules.e2e && ["@playwright/test"],
    modules.unit && ["vitest"],
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
      test: modules.unit ? "vitest --watch=false" : undefined,
      storybook: modules.storybook ? "start-storybook -p 6006" : undefined,
      "build-storybook": modules.storybook ? "build-storybook" : undefined,
      e2e: modules.e2e ? "npx playwright test" : undefined,
    },
    dependencies,
    devDependencies,
    msw: {
      workerDirectory: "public",
    },
  };
}
