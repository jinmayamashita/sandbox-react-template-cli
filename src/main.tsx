import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const prepare = async () => {
  if (!import.meta.env.DEV) return;

  const { worker } = await import("./__mocks__/api");
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
