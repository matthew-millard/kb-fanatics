import React from "react";
import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import {
  Home,
  Keyboards,
  Switches,
  Keycaps,
  Deskmats,
  Accessories,
  Cart,
  MyAccount,
  LoginPage,
  Dashboard,
} from "./pages";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/keyboards", element: <Keyboards /> },
      { path: "/switches", element: <Switches /> },
      { path: "/keycaps", element: <Keycaps /> },
      { path: "/deskmats", element: <Deskmats /> },
      { path: "/accessories", element: <Accessories /> },
      { path: "/cart", element: <Cart /> },
      { path: "/myaccount", element: <MyAccount /> },
    ],
  },
]);

export default router;
