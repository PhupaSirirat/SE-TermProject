import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './Login';
import Register from './Register';
import Routefinder from "./Routefinder";
import Home from "./Home";
import Favouriteroute from "./Favouriteroute";
import History from "./History";

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
  {
    path: "/favouriteroute", 
    element: <Favouriteroute />, 
  },
  {
    path: "/history", 
    element: <History />, 
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
