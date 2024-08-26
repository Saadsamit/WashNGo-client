import App from "@/App";
import Home from "@/Pages/Home";
import Login from "@/Pages/Login";
import SignIn from "@/Pages/SignIn";
import { createBrowserRouter } from "react-router-dom";
import Services from "./../Pages/Services";
import Booking from "@/Pages/Booking";
import ServiceDetail from "@/Pages/ServiceDetail";
import ErrorPage from "@/Pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "@/Pages/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/service",
        element: <Services />,
      },
      {
        path: "/service/:id",
        element: <ServiceDetail />,
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default routes;
