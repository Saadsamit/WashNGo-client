import Container from "@/components/Container/Container";
import Title from "antd/es/typography/Title";
import image from "@/assets/failed.png";
import { Button, Skeleton } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCancelPaymentQuery } from "@/redux/features/payment/paymentApi";

const CancelPayment = () => {
  const { id } = useParams();
  const { data, isLoading } = useCancelPaymentQuery({ id });
  const navigate = useNavigate();

  if (isLoading) {
    <Skeleton />;
  }
  if (data?.success) {
    navigate("/");
  }

  return (
    <Container className="py-20">
      <div className="flex justify-center items-center text-center flex-col space-y-4">
        <div className="flex justify-center items-center">
          <img src={image} className="size-12" alt="Successfull" />
          <Title className="!text-primary !m-0 !pl-3" level={3}>
            Payment Cancel
          </Title>
        </div>
        <Link to={"/"}>
          <Button>Go Home</Button>
        </Link>
      </div>
    </Container>
  );
};

export default CancelPayment;
