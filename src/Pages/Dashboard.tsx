import DashboardNav from "@/components/ui/Dashboard/DashboardNav";
import { TbBrandBooking } from "react-icons/tb";
import type { MenuProps } from "antd";
import { Flex, Menu } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import {
  MdAccountCircle,
  MdHomeRepairService,
  MdUpcoming,
} from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { currentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks/ReduxHook";
import { SiPastebin } from "react-icons/si";

type MenuItem = Required<MenuProps>["items"][number];

const adminItems: MenuItem[] = [
  {
    key: "/dashboard",
    label: (
      <NavLink to={"/dashboard"} className={"text-lg font-bold capitalize"}>
        recent bookings
      </NavLink>
    ),
    icon: <TbBrandBooking className="size-5" />,
  },
  {
    key: "/dashboard/serviceManagement",
    label: (
      <NavLink
        to={"/dashboard/serviceManagement"}
        className={"text-lg font-bold capitalize"}
      >
        service management
      </NavLink>
    ),
    icon: <MdHomeRepairService className="size-5" />,
  },
  {
    key: "/dashboard/slotManagement",
    label: (
      <NavLink
        to={"/dashboard/slotManagement"}
        className={"text-lg font-bold capitalize"}
      >
        slot management
      </NavLink>
    ),
    icon: <FaCheckToSlot className="size-5" />,
  },
  {
    key: "/dashboard/userManagement",
    label: (
      <NavLink
        to={"/dashboard/userManagement"}
        className={"text-lg font-bold capitalize"}
      >
        user management
      </NavLink>
    ),
    icon: <FaUser className="size-5" />,
  },
  {
    key: "/dashboard/myAccount",
    label: (
      <NavLink
        to={"/dashboard/myAccount"}
        className={"text-lg font-bold capitalize"}
      >
        my account
      </NavLink>
    ),
    icon: <MdAccountCircle className="size-5" />,
  },
];

const userItems: MenuItem[] = [
  {
    key: "/dashboard",
    label: (
      <NavLink to={"/dashboard"} className={"text-lg font-bold capitalize"}>
        UpcomeingBooking
      </NavLink>
    ),
    icon: <MdUpcoming className="size-5" />,
  },
  {
    key: "/dashboard/pastBooking",
    label: (
      <NavLink
        to={"/dashboard/pastBooking"}
        className={"text-lg font-bold capitalize"}
      >
        past booking
      </NavLink>
    ),
    icon: <SiPastebin className="size-5" />,
  },
  {
    key: "/dashboard/myAccount",
    label: (
      <NavLink
        to={"/dashboard/myAccount"}
        className={"text-lg font-bold capitalize"}
      >
        my account
      </NavLink>
    ),
    icon: <MdAccountCircle className="size-5" />,
  },
];
const Dashboard = () => {
  const token = useAppSelector(currentToken);
  let user: any = {};
  if (token) {
    user = jwtDecode(token);
  }
  const items =
    (user?.role === "admin" && adminItems) ||
    (user?.role === "user" && userItems) ||
    [];
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (width <= 640) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <DashboardNav toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
      <Flex>
        <div>
          <div className="sm:w-64 fixed top-20 bottom-0">
            <Menu
              className="bg-primary min-h-[calc(100vh-84px)]"
              defaultSelectedKeys={[location?.pathname]}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={items}
            />
          </div>
          <div className={collapsed ? "mr-20" : "mr-64"}></div>
        </div>
        <div className="m-6 w-full h-full">
          <Outlet />
        </div>
      </Flex>
    </>
  );
};

export default Dashboard;
