import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { theme } from "./styles/HomeScreen";
import { store } from "../src/store/index";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="407616717677-qkk3uid5nctu31v8k72109nmc451eq5q.apps.googleusercontent.com">
    {/* <React.StrictMode> */}
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);


