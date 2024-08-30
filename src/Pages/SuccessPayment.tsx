import Container from "@/components/Container/Container";
import Title from "antd/es/typography/Title";
import image from "@/assets/success.png";
import { Button } from "antd";
import { Link } from "react-router-dom";

const SuccessPayment = () => {
  return (
    <Container className="py-20">
      <div className="flex justify-center items-center text-center flex-col space-y-4">
        <div className="flex justify-center items-center">
          <img src={image} className="size-12" alt="Successfull" />
          <Title className="!text-primary !m-0 !pl-3" level={3}>
            Payment Successfull
          </Title>
        </div>
        <Link to={"/"}>
          <Button>Go Home</Button>
        </Link>
      </div>
    </Container>
  );
};

export default SuccessPayment;
