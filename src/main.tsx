import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
