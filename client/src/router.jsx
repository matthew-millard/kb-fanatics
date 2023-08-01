import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home, Keyboards, Switches, Keycaps, Deskmats, Accessories } from "./pages";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/keyboards", element: <Keyboards /> },
      { path: "/switches", element: <Switches /> },
      { path: "/keycaps", element: <Keycaps /> },
      { path: "/Deskmats", element: <Deskmats /> },
      { path: "/Accessories", element: <Accessories /> },
    ],
  },
]);

export default router;