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
      initial: [0, 2],
      message: "Which features do you want to use?",
      // @ts-expect-error multiple selections not allowed in initial type
      choices: [
        { name: "foo", message: "Foo" },
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

  // copy the per-package-manager template
  const modulesDir = path.resolve(projectDir, "src/modules");
  fse.mkdirSync(modulesDir, { recursive: true });

  Object.keys(modules)
    .filter((name) => modules[name])
    .map((templateName) => {
      const moduleDir = path.resolve(modulesDir, templateName);
      const template = path.resolve(__rootDir, "templates", templateName);
      fse.copySync(template, moduleDir, {
        recursive: true,
        filter: (src) => {
          return !["pages", "__tests__", "app.tsx"].includes(
            path.basename(src)
          );
        },
      });

      // copy pages
      const pagesDir = path.resolve(template, "pages");
      fse.copySync(pagesDir, `${projectDir}/src/pages`, {
        recursive: true,
        overwrite: true,
      });

      // overwrite app.tsx
      const appFile = path.resolve(template, "app.tsx");
      fse.existsSync(appFile) &&
        fse.copySync(appFile, `${projectDir}/src/app.tsx`, {
          overwrite: true,
        });

      // copy __tests__
      const testsDir = path.resolve(template, "__tests__");
      fse.ensureDir(testsDir).then(() => {
        fse.copySync(testsDir, `${projectDir}/src/__tests__`, {
          recursive: true,
          overwrite: true,
        });
      });

      // remove unnecessary folders
      fse.readdir(
        moduleDir,
        (_, files) => !files.length && fse.remove(moduleDir)
      );
    });

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
