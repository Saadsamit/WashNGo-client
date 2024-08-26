import { TService } from "@/Types";
import { Card, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

type TServiceCard = {
  data: TService;
};

const ServiceCard = ({ data }: TServiceCard) => {
  return (
    <Link to={`/service/${data?._id}`}>
      <Card
        style={{ minHeight: "410px" }}
        cover={<img alt={data?.name} className="h-60" src={data?.image} />}
      >
        <Title level={3} className="font-bold">
          {data?.name}
        </Title>
        <Flex justify="space-between" className="mb-1">
          <p className="font-bold">${data?.price}</p>
          <p className="font-bold">{data?.duration} Min</p>
        </Flex>
        <p>{data?.description}</p>
      </Card>
    </Link>
  );
};

export default ServiceCard;
