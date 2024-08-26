import { useGetAllServicesQuery } from "@/redux/features/Services/serviceApi";
import { Button, Col, Row, Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import Container from "../Container/Container";
import ServiceCard from "../ui/ServiceCard";
import { TService } from "@/Types";
import { Link } from "react-router-dom";

const FeaturedServices = () => {
  const { data, isLoading } = useGetAllServicesQuery({ limit: 6 });
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div>
      <Title className="capitalize text-center !text-primary !my-10" level={2}>
        Featured Services
      </Title>
      <Container>
        <Row className="gap-6" justify={"center"}>
          {data?.data?.map((item: TService) => (
            <Col md={7} sm={11} key={item?._id}>
              <ServiceCard data={item} />
            </Col>
          ))}
          <Button>
            <Link to={'/service'}>See More</Link>
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default FeaturedServices;
