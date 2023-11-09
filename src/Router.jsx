import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './Login';
import Register from './Register';
import Routefinder from "./Routefinder";
import Home from "./Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/routefinder",
    element: <Routefinder />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
