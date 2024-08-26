import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/WashNGo-logo-white.png";
import { Button, Drawer } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/ReduxHook";
import {
  currentToken,
  logout,
} from "@/redux/features/auth/authSlice";
type TLinks = {
  path: string;
  name: string;
  children?: TLinks[];
};

const Navbar = () => {
  const user = useAppSelector(currentToken);
  const dispatch = useAppDispatch();
  const [dropdown, setDropdown] = useState(false);
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
            {user ? (
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
                  if (!item?.children) {
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
                  }
                  return (
                    <li className="mb-4" key={item.name}>
                      <a
                        onClick={() => setDropdown(!dropdown)}
                        className="py-2 px-3 border block text-center font-semibold rounded cursor-pointer hover:text-white hover:bg-hover capitalize"
                      >
                        {item?.name}{" "}
                        {dropdown ? <UpOutlined /> : <DownOutlined />}
                      </a>
                      {dropdown && (
                        <ul className="p-2 mb-4 mt-1 text-sm bg-primary rounded-lg">
                          {item?.children?.map((dropdownItem) => (
                            <li className="mb-4 last:mb-0">
                              <Link
                                to={dropdownItem?.path}
                                className="block rounded-md px-4 py-2 text-white border hover:border-none text-center font-semibold hover:bg-hover capitalize hover:text-white"
                              >
                                {dropdownItem?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
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
                if (!item?.children) {
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
                }
                return (
                  <li className="relative" key={item.name}>
                    <a
                      onClick={() => setDropdown(!dropdown)}
                      className="py-2 px-3 text-white rounded cursor-pointer hover:bg-hover capitalize"
                    >
                      {item?.name}{" "}
                      {dropdown ? <UpOutlined /> : <DownOutlined />}
                    </a>
                    {dropdown && (
                      <ul
                        className="p-2 text-sm absolute bg-white border-2 rounded-lg top-14"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        {item?.children?.map((dropdownItem) => (
                          <li>
                            <Link
                              to={dropdownItem?.path}
                              className="block rounded-md px-4 py-2 hover:bg-hover capitalize hover:text-white"
                            >
                              {dropdownItem?.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
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
