import banner from "@/assets/banner.png";
import { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";

type TMyBanner = {
  title: string;
};

const MyBanner = ({ title }: TMyBanner) => {
  const location = useLocation();
  const style: CSSProperties = {
    background: `url(${banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div>
      <div style={style} className="h-[400px] relative">
        <div className="absolute inset-0 opacity-65 bg-black"></div>
        <div className="relative z-10 text-white space-x-4 flex justify-center items-center h-full">
          <Link to={"/"} className="capitalize hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link to={location.pathname} className="capitalize">
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyBanner;
