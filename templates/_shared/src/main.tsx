import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import Routes from "./routes";
import "./index.css";

// TODO: Better flexibility if we pass the mock worker path as an argument
async function prepare() {
  if (!import.meta.env.DEV) return;

  const { worker } = await import("./__tests__/mocks/api");

  worker.start({
    onUnhandledRequest: "bypass",
  });
}

prepare().then(() => {
  return ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  ).render(
    <React.StrictMode>
      <App>
        <Routes />
      </App>
    </React.StrictMode>
  );
});
