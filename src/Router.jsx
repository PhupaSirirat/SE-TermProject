import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from './Login';
import Register from './Register';
import Home from "./Home";
import Favouriteroute from "./Favouriteroute";
import History from "./History";
import Map from "./Map";

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
    path: "/favouriteroute", 
    element: <Favouriteroute />, 
  },
  {
    path: "/history", 
    element: <History />, 
  },
  {
    path: "/map", 
    element: <Map />, 
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
