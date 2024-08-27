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
import PrivateRouteWithRole from "./PrivateRouteWithRole";
import RecentBookings from "@/Pages/admin/RecentBookings";
import ServiceManagement from "@/Pages/admin/ServiceManagement";
import SlotManagement from "@/Pages/admin/SlotManagement";
import UserManagement from "@/Pages/admin/UserManagement";
import UpcomingBooking from "@/Pages/user/UpcomingBooking";
import MyAccount from "@/Pages/MyAccount";
import PastBooking from "@/Pages/user/PastBooking";

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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRouteWithRole
            admin={<RecentBookings />}
            user={<UpcomingBooking />}
          />
        ),
      },
      {
        path: "serviceManagement",
        element: (
          <PrivateRoute>
            <ServiceManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "myAccount",
        element: (
          <PrivateRoute>
            <MyAccount />
          </PrivateRoute>
        ),
      },
      {
        path: "slotManagement",
        element: (
          <PrivateRoute>
            <SlotManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "userManagement",
        element: (
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "pastBooking",
        element: (
          <PrivateRoute>
            <PastBooking />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
