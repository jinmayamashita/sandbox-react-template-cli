#!/usr/bin/env tsx
// The above environment can only be used for debugging development.

import gradient from "gradient-string";
import Enquirer from "enquirer";
import meow from "meow";
import * as path from "node:path";
import * as fs from "node:fs";
import * as url from "node:url";
import rpj from "read-package-json-fast";

// helpers
const print = (text?: string) => (text ? console.log(text) : console.log());

const delay = (ms: number = 500) => new Promise((res) => setTimeout(res, ms));

const help = `
Usage: create-react-template [flags...] [<dir>]
Options:
  -V, --version                            foo bar foo bar
  --template <path-to-template>            foo bar foo bar
  -h, --help                               foo bar foo bar
`;

const title = gradient([
  // https://www.color-hex.com/color-palette/1019451
  "#e6eff1",
  "#ffaeb2",
  "#ff4c4c",
  "#93366a",
  "#41235b",
])("ↀ Front-end templates");

const getDependencies = async (
  app: "rest" | "graphql",
  packageFile: string
): Promise<{
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}> => {
  return rpj(packageFile).then((data: Record<string, any>) => {
    const dependencies = {
      base: ["react", "react-dom", "wouter", "@tanstack/react-query"],
      rest: [],
      graphql: ["graphql", "graphql-request"],
    };

    const devDependencies = {
      base: ["typescript", "vite", "@vitejs/plugin-react", "msw"],
      rest: [],
      graphql: [],
    };

    return {
      dependencies: Object.fromEntries(
        Object.entries(data.dependencies).filter((e) =>
          new Set([...dependencies.base, ...dependencies[app]]).has(e[0])
        )
      ),
      devDependencies: Object.fromEntries(
        Object.entries(data.devDependencies).filter((e) =>
          new Set([...devDependencies.base, ...devDependencies[app]]).has(e[0])
        )
      ),
    };
  });
};

// variables
const __filename = url.fileURLToPath(import.meta.url);

const ROOT_DIR = path.resolve(path.dirname(__filename), "..");
const SRC_DIR = path.resolve(ROOT_DIR, "src");
const TEMPLATE_DIR = path.resolve(SRC_DIR, "templates");
const MOCKING_DIR = path.resolve(SRC_DIR, "__mocks__");

// main
const run = async () => {
  print();
  print(title);
  delay();
  print();

  const { input, flags, showHelp, showVersion } = meow(help, {
    booleanDefault: undefined,
    importMeta: import.meta,
    flags: {
      help: { type: "boolean", default: false, alias: "h" },
      api: { type: "string" },
      version: { type: "boolean", default: false, alias: "v" },
    },
  });

  if (flags.help) showHelp();
  if (flags.version) showVersion();

  // options
  const projectName =
    input.length > 0
      ? input[0]
      : (
          await Enquirer.prompt<{ projectName: string }>({
            type: "input",
            name: "projectName",
            initial: "my-project",
            message: "Where would you like to create your project?",
          })
        ).projectName;

  const api: "rest" | "graphql" = ["rest", "graphql"].includes(
    flags.api as "rest" | "graphql"
  )
    ? (flags.api as "rest" | "graphql")
    : (
        await Enquirer.prompt<{ api: "rest" | "graphql" }>({
          name: "api",
          type: "select",
          message: "Choose the API design architecture for your project",
          choices: [
            { name: "rest", message: "RESTful" },
            { name: "graphql", message: "GraphQL" },
          ],
        })
      ).api;

  // TODO:
  const apps = {
    rest: true,
    graphql: true,
  } as const;

  // handle files
  const PROJECT_DIR = path.resolve(process.cwd(), projectName);
  const PROJECT_SRC_DIR = path.resolve(PROJECT_DIR, "src");

  // TODO: Exit install process with error message in production
  if (fs.existsSync(PROJECT_DIR)) fs.rmSync(PROJECT_DIR, { recursive: true });

  fs.mkdirSync(PROJECT_SRC_DIR, { recursive: true });

  // Copy directories under src
  fs.cpSync(SRC_DIR, PROJECT_SRC_DIR, {
    recursive: true,
    force: true,
    filter: (f) => ![TEMPLATE_DIR, MOCKING_DIR].includes(f),
  });

  // app
  fs.copyFileSync(`${TEMPLATE_DIR}/app.tsx`, `${PROJECT_SRC_DIR}/app.tsx`);

  // routes
  fs.copyFileSync(
    `${TEMPLATE_DIR}/routes.tsx`,
    `${PROJECT_SRC_DIR}/routes.tsx`
  );

  // pages
  // TODO: Page file does not nest
  fs.copyFileSync(
    `${TEMPLATE_DIR}/page-with-${api}.tsx`,
    `${PROJECT_SRC_DIR}/components/pages/user.tsx`
  );

  // mock files
  // NOTE: It doesn't feel right that mock is directly under the src
  fs.mkdirSync(`${PROJECT_SRC_DIR}/__mocks__`, { recursive: true });
  fs.copyFileSync(
    path.resolve(SRC_DIR, `__mocks__/${api}-api.ts`),
    `${PROJECT_SRC_DIR}/__mocks__/api.ts`
  );

  // index.html
  fs.writeFileSync(
    `${PROJECT_DIR}/index.html`,
    `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" href="data:;base64,iVBORw0KGgo=">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${projectName}</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.tsx"></script>
    </body>
  </html>`,
    "utf-8"
  );

  // tsconfig
  fs.copyFileSync(
    path.resolve(ROOT_DIR, "tsconfig.json"),
    `${PROJECT_DIR}/tsconfig.json`
  );
  fs.copyFileSync(
    path.resolve(ROOT_DIR, "tsconfig.node.json"),
    `${PROJECT_DIR}/tsconfig.node.json`
  );

  // vite config
  fs.copyFileSync(
    path.resolve(ROOT_DIR, "vite.config.ts"),
    `${PROJECT_DIR}/vite.config.ts`
  );

  // package.json
  const { dependencies, devDependencies } = await getDependencies(
    api,
    path.resolve(ROOT_DIR, "package.json")
  );
  let json = JSON.stringify(
    {
      // TODO: validate npm package name
      // refs. https://github.com/npm/validate-npm-package-name
      name: projectName,
      type: "module",
      private: true,
      version: "0.0.1",
      scripts: {
        dev: "vite",
        build: "tsc && vite build",
      },
      dependencies,
      devDependencies,
    },
    null,
    2
  );
  fs.writeFileSync(`${PROJECT_DIR}/package.json`, json, "utf-8");

  // success messages
  print();
  print("Done. Now run:");
  print();
  print(`cd ${projectName}`);
  print("yarn");
  print("npx msw init ./public --save");
  print("yarn dev");
};
run();
