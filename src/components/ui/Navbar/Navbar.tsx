import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/WashNGo-logo-white.png";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/ReduxHook";
import { currentToken, logout } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
export type TLinks = {
  path: string;
  name: string;
  NotAllow?: string;
  userRequired?: boolean;
};

const Navbar = () => {
  const token = useAppSelector(currentToken);
  let user: any = {};
  if (token) {
    user = jwtDecode(token);
  }
  const role = user?.role;
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const links: TLinks[] = [
    {
      path: "/",
      name: "home",
    },
    {
      path: "/service",
      name: "services",
    },
    {
      path: "/booking",
      name: "Booking",
      NotAllow: "admin",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      userRequired: true,
    },
  ];
  return (
    <header id="navbar">
      <nav className="bg-primary -mb-px dark:bg-gray-900 w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex flex-col justify-center items-center hover:bg-hover rounded-md p-1 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-5" alt="Logo" />
            <span className="text-white font-bold text-center">WashNGo</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {token ? (
              <Button
                size="large"
                type="primary"
                className="capitalize"
                onClick={() => dispatch(logout())}
              >
                logout
              </Button>
            ) : (
              <Button size="large" type="primary" className="capitalize">
                {location.pathname === "/login" ? (
                  <Link to={"/signin"}>sign in</Link>
                ) : (
                  <Link to={"/login"}>log in</Link>
                )}
              </Button>
            )}
            <Button
              type="primary"
              size="large"
              className="md:hidden block"
              onClick={showDrawer}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </Button>
            <Drawer onClose={onClose} open={open}>
              <ul>
                {links?.map((item) => {
                  if (item?.NotAllow && item?.NotAllow === role) {
                    return;
                  }
                  if (item?.userRequired && !token) {
                    return;
                  }
                  return (
                    <li className="mb-4" key={item.name}>
                      <NavLink
                        to={item?.path}
                        className="py-2 px-3 border block text-center font-semibold rounded hover:text-white hover:bg-hover capitalize"
                      >
                        {item?.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </Drawer>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {links?.map((item) => {
                if (item?.NotAllow && item?.NotAllow === role) {
                  return;
                }
                if (item?.userRequired && !token) {
                  return;
                }
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item?.path}
                      className="py-2 px-3 text-white rounded hover:bg-hover capitalize"
                    >
                      {item?.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
