import React from "react";
import ReactDOM from "react-dom/client";
import XX from "create-react-code/templates/auth/foo";

const App = () => (
  <>
    <XX />
  </>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
