import { Outlet } from "react-router-dom";
import Navbar from "./../ui/Navbar/Navbar";
import Footer from "../ui/Footer/Footer";
import scrollToTop from "@/Hooks/scrollToTop";
import useScroll from "@/Hooks/useScroll";
import { FaArrowUp } from "react-icons/fa";

const MainLayout = () => {
  const scroll = useScroll();
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-437px)]">
        <Outlet />
      </div>
      <Footer />
      {scroll > 70 && (
        <button
          className="fixed right-10 bottom-10 sm:p-4 p-2 rounded-full z-30 bg-hover hover:bg-primary text-white border"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default MainLayout;
