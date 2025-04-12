import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/theme";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
        </ThemeProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
