import React from "react";
import ReactDOM from "react-dom/client";
// TODO: Separate mock api per app
import App from "./apps/graphql-app";

const prepare = async () => {
  if (!import.meta.env.DEV) return;

  // TODO: Separate mock api per app
  // const { worker } = await import("./__mocks__/rest-api");
  const { worker } = await import("./__mocks__/graphql-api");
  worker.start();
};

prepare().then(() => {
  return ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  ).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
