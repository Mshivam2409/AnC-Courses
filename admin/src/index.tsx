import React from "react";
import ReactDOM from "react-dom";
import "index.css";
import App from "App";
import reportWebVitals from "reportWebVitals";
import { RecoilRoot } from "recoil";
import { MuiThemeProvider } from "@material-ui/core";
import globaltheme from "config/theme";

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={globaltheme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
