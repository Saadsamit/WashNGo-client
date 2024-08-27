import { Link } from "react-router-dom";
import logo from "@/assets/WashNGo-logo-white.png";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";

type TDashboardNav = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

const DashboardNav = ({ collapsed, toggleCollapsed }: TDashboardNav) => {
  return (
    <header>
      <nav className="bg-primary fixed top-0 dark:bg-gray-900 w-full z-20 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            className="flex flex-col justify-center items-center hover:bg-hover rounded-md p-1 space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-5" alt="Logo" />
            <span className="text-white font-bold text-center">WashNGo</span>
          </Link>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
      </nav>
      <div className="mb-20"></div>
    </header>
  );
};

export default DashboardNav;
