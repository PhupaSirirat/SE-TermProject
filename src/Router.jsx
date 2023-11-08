import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './Login';
import Register from './Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
