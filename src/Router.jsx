import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './components/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
