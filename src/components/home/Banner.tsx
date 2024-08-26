import banner from "@/assets/banner.png";
import { Button, Flex } from "antd";
import { Link } from "react-router-dom";
import Container from "../Container/Container";
import { CSSProperties } from "react";

const Banner = () => {
  const style: CSSProperties = {
    background: `url(${banner})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  return (
    <div style={style} className="h-[calc(100vh-87px)] relative">
      <div className="absolute inset-0 opacity-65 bg-black"></div>
      <div className="relative z-10 text-white space-y-4 h-full">
        <Container className="h-full">
          <Flex align="center" className="h-full">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold">
                Experience <br /> the Ultimate Shine
              </h1>
              <h3 className="text-base font-light">
                Premium Car Washing Services for a Shine That Lasts
              </h3>
              <Button size="large" className="inline-block">
                <Link to={"/service"}>Get Services</Link>
              </Button>
            </div>
          </Flex>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
