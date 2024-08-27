import DashboardNav from "@/components/ui/Dashboard/DashboardNav";
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Flex, Menu } from "antd";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const adminItems: MenuItem[] = [
  {
    key: "/dashboard",
    label: <NavLink to={"/dashboard"}>ssss</NavLink>,
    icon: <AppstoreOutlined />,
  },
  {
    key: "sub2",
    label: "Navigation Two",
  },
  {
    key: "sub4",
    label: "Navigation Three",
  },
];
const Dashboard = () => {
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
          <div className="sm:w-64 fixed bottom-0">
            <Menu
              className="bg-primary min-h-[calc(100vh-84px)]"
              defaultSelectedKeys={[location?.pathname]}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={adminItems}
            />
          </div>
          <div className={collapsed ? "mr-20" : "mr-64"}></div>
        </div>
        <div className="m-6">
          <Outlet />
        </div>
      </Flex>
    </>
  );
};

export default Dashboard;
