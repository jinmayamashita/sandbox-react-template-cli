#!/usr/bin/env node

import gradient from "gradient-string";
import Enquirer from "enquirer";
import fse from "fs-extra";
import * as path from "node:path";
import prettier from "prettier";
import { makePackages } from "./makePackages";

type Modules = {
  graphql: boolean;
  auth: boolean;
  store: boolean;
  e2e: boolean;
  storybook: boolean;
  unit: boolean;
};

// variables
const __rootDir = path.resolve(__dirname, "..");

const title = gradient([
  // https://www.color-hex.com/color-palette/1019451
  "#e6eff1",
  "#ffaeb2",
  "#ff4c4c",
  "#93366a",
  "#41235b",
])("ↀ React code");

// helpers
function showTitle() {
  print();
  print(title);
  delay();
  print();
}

async function success({ path, modules }: { path: string; modules: Modules }) {
  print();
  print("Done. Now run:");
  print();
  print(`cd ${path}`);
  print("yarn");
  modules.e2e && print("npx playwright install");
  //print("npx msw init ./public --save");
  print("yarn dev");
}

async function fail(err: Error) {
  if (err) console.log(err);

  console.log("Aborting installation.");
  process.exit(1);
}

const print = (text?: string) => (text ? console.log(text) : console.log());

const delay = (ms: number = 500) => new Promise((res) => setTimeout(res, ms));

const run = async () => {
  showTitle();

  // input the app directory
  const projectDir = path.resolve(
    process.cwd(),
    (
      await Enquirer.prompt<{ dir: string }>({
        type: "input",
        name: "dir",
        initial: "./my-project",
        message: "Where would you like to create your project?",
      })
    ).dir
  );
  const projectName = path.basename(projectDir);

  // create app directory
  // TODO: do not remove in production
  if (fse.existsSync(projectDir)) fse.rmSync(projectDir, { recursive: true });

  fse.mkdirSync(projectDir, { recursive: true });
  // copy the shared template
  const sharedTemplate = path.resolve(__rootDir, "templates", `_shared`);
  fse.copySync(sharedTemplate, projectDir, { recursive: true });

  // select modules used in app
  const modules = (
    await Enquirer.prompt<{ modules: string[] }>({
      type: "multiselect",
      name: "modules",
      initial: [0, 1, 2],
      message: "Which features do you want to use?",
      // @ts-expect-error multiple selections not allowed in initial type
      choices: [
        { name: "graphql", message: "GraphQL" },
        { name: "auth", message: "Auth" },
        { name: "store", message: "Store" },
        { name: "e2e", message: "E2E" },
        { name: "storybook", message: "Storybook" },
        { name: "unit", message: "Unit test" },
      ],
    })
  ).modules.reduce(
    (acc, cur) => ({
      ...acc,
      ...{ [cur]: true },
    }),
    {
      graphql: false,
      auth: false,
      store: false,
      e2e: false,
      storybook: false,
      unit: false,
    }
  );

  // write routes.tsx
  fse.writeFileSync(
    path.join(projectDir, "src/routes.tsx"),
    prettier.format(
      `
import { Route, Switch } from "wouter";
import Home from "./pages/home";
import User from "./pages/user";
${modules.auth ? `import { PrivateRoute } from "./hooks/useAuth";` : ""}
${modules.auth ? `import Secret from "./pages/secret";` : ""}
${modules.store ? `import BearStore from "./pages/bear";` : ""}

function Routes() {
  return(
    <Switch>
      ${
        modules.auth
          ? `<PrivateRoute path="/secret"><Secret /></PrivateRoute>`
          : ""
      }
      ${modules.store ? `<Route path="/store"><BearStore /></Route>` : ""}
      <Route path="/user"><User /></Route>
      <Route path="/"><Home /></Route>
      <Route>404</Route>
    </Switch>
  )
}
export default Routes;
`,
      { parser: "babel" }
    )
  );

  // copy the per-package-manager template
  // auth
  const authTemplate = path.resolve(__rootDir, "templates", `auth`);
  modules.auth &&
    fse.copySync(authTemplate, `${projectDir}/src`, {
      recursive: true,
      overwrite: true,
    });

  // graphql
  const graphqlTemplate = path.resolve(__rootDir, "templates", `graphql`);
  modules.graphql &&
    fse.copySync(graphqlTemplate, `${projectDir}/src`, {
      recursive: true,
      overwrite: true,
    });

  // store
  const storeTemplate = path.resolve(__rootDir, "templates", `store`);
  modules.store &&
    fse.copySync(storeTemplate, `${projectDir}/src`, {
      recursive: true,
      overwrite: true,
    });

  // e2e
  const e2eTemplate = path.resolve(__rootDir, "templates", `e2e`);
  modules.e2e &&
    fse.copySync(e2eTemplate, projectDir, {
      recursive: true,
      overwrite: true,
    });

  // storybook
  const storybookTemplate = path.resolve(__rootDir, "templates", `storybook`);
  modules.storybook &&
    fse.copySync(storybookTemplate, projectDir, {
      recursive: true,
      overwrite: true,
    });

  // TODO:
  // jest

  // write package.json
  fse.writeFileSync(
    path.join(projectDir, "package.json"),
    JSON.stringify(
      await makePackages(
        path.resolve(__rootDir, "package.json"),
        projectName,
        modules
      ),
      null,
      2
    )
  );

  return { path: projectName, modules } as const;
};
run().then(success).catch(fail);
