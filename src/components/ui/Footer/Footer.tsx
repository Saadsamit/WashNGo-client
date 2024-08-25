import logo from "@/assets/WashNGo-logo-white.png";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaFacebookF,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-hover">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 px-8">
        <Row className="items-center md:justify-end justify-center">
          <Col md={12} span={24} className="text-white justify-center">
            <div className="md:block flex flex-col items-center md:mt-0 mt-4">
              <Link to="/" className="mb-4 sm:mb-0 inline-block">
                <img src={logo} className="h-8 text-center" alt="Logo" />
                <span className="text-2xl font-semibold text-white">
                  WashNGo
                </span>
              </Link>

              <p className="w-3/4 py-2 md:text-start text-center">
                Efficient car washing system offering quick and thorough
                cleaning services using advanced technology eco-friendly methods
                ensuring your vehicle shines.
              </p>
            </div>
            <ul className="flex flex-wrap items-center space-x-4 mb-6 mt-4 md:justify-start justify-center text-sm font-medium sm:mb-0">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  <FaFacebookF className="size-6" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  <BsTwitterX className="size-6" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  <FaDiscord className="size-6" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  <FaLinkedinIn className="size-6" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  <FaYoutube className="size-6" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  <FaTelegramPlane className="size-6" />
                </a>
              </li>
            </ul>
          </Col>
          <Col md={12} span={24}>
            <div className="flex flex-col md:items-end items-center text-white">
              <h2 className="mb-6 text-sm font-semibold text-[#E1D7B7] uppercase dark:text-white">
                Links
              </h2>
              <ul className="text-white text-end font-medium">
                <li className="mb-4">
                  <Link to={"/service"} className="hover:underline">
                    Services
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to={"/booking"} className="hover:underline">
                    Booking
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-white text-center">
          Fitness Plus™ © 2024{" "}
          <a
            href="https://saadsamit-portfolio.netlify.app"
            className="hover:underline"
          >
            WashNGo™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
