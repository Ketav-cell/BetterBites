import React from "react";
import ReactDOM from "react-dom";

async function loadApp() {
  const App = (await import("./App.js")).default;
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

loadApp();
