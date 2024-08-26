import MyBanner from "@/components/ui/MyBanner";
import Title from "antd/es/typography/Title";
import { Col, Row, Skeleton } from "antd";
import Container from "@/components/Container/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import { useGetAllServicesQuery } from "@/redux/features/Services/serviceApi";
import { TService } from "@/Types";

const Services = () => {
  const { data, isLoading } = useGetAllServicesQuery(undefined);
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div>
      <MyBanner title="services" />
      <Title className="capitalize text-center !text-primary !my-10" level={2}>
        our Services
      </Title>
      <Container>
        <Row className="gap-6" justify={"center"}>
          {data?.data?.map((item: TService) => (
            <Col md={7} sm={11}  key={item?._id}>
              <ServiceCard data={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Services;
