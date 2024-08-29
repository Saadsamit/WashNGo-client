import {
  addCompareServie,
  compareService,
} from "@/redux/features/Compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/ReduxHook";
import { TService } from "@/Types";
import { Button, Card, Flex } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";

type TServiceCard = {
  data: TService;
};

const ServiceCard = ({ data }: TServiceCard) => {
  const navigate = useNavigate();
  const compareData = useAppSelector(compareService);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(addCompareServie({ data }));
    navigate("/compare");
  };
  return (
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
      <p>
        {data?.description.length === 40
          ? data?.description
          : `${data?.description?.slice(0, 40)}...`}
      </p>
      <div className="mt-4">
        {compareData?.item1 ? (
          compareData?.item1?._id === data._id ? (
            <div className="!my-12"></div>
          ) : (
            <Button onClick={handleClick} className="w-full mb-2">
              compare
            </Button>
          )
        ) : (
          ""
        )}
        <Link to={`/service/${data?._id}`}>
          <Button className="w-full">Detail</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ServiceCard;
