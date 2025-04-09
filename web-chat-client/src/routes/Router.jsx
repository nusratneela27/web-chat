// import { createBrowserRouter, Navigate } from "react-router";
// import Home from "../pages/Home/Home";
// import SignUp from "../pages/SignUp/SignUp";
// import Login from "../pages/Login/Login";

// const authUser = JSON.parse(localStorage.getItem("chat-user"));

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: authUser ? <Home /> : <Navigate to="/login" />,
//   },
//   {
//     path: "/signup",
//     element: authUser ? <Navigate to="/" /> : <SignUp />,
//   },
//   {
//     path: "/login",
//     element: authUser ? <Navigate to="/" /> : <Login />,
//   },
// ]);

import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
