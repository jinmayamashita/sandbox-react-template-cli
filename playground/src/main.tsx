import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom/client";
import App from "../../templates/auth/src/app";
import Navigation from "./components/atom/navigation";
import Routes from "./routes";
import "../../templates/_shared/src/index.css";

async function prepare() {
  if (!import.meta.env.DEV) return;

  const { worker } = await import(
    "../../templates/_shared/src/__tests__/mocks/api"
  );

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
        <Navigation />
      </App>
    </React.StrictMode>
  );
});
