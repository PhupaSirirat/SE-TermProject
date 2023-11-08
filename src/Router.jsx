import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './Login';
import Home from "./Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
