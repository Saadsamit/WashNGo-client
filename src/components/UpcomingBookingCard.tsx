import { TBooking } from "@/Types";
import CountDownTime from "./CountDownTime";
import { Card, Flex } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";

type TUpcomingBookingCard = {
  data: TBooking;
};

const UpcomingBookingCard = ({ data }: TUpcomingBookingCard) => {
  return (
    <Card
      style={{ minHeight: "410px" }}
      cover={
        <img
          alt={data?.service?.name}
          className="h-60"
          src={data?.service?.image}
        />
      }
    >
      <Flex justify="space-between" className="mb-1">
        <p className="font-bold">
          Date: {moment(data?.slot?.date).format("L")}
        </p>
        <CountDownTime
          date={data?.slot?.date}
          startTime={data?.slot?.startTime}
        />
      </Flex>
      <Title level={3} className="font-bold">
        {data?.service?.name}
      </Title>
      <Flex justify="space-between" className="mb-1">
        <p className="font-bold">${data?.service?.price}</p>
        <p className="font-bold">{data?.service?.duration} Min</p>
      </Flex>
      <Flex justify="space-between" className="mb-1">
        <p className="font-bold">Start Time: {data?.slot?.startTime}</p>
        <p className="font-bold">End Time: {data?.slot?.endTime}</p>
      </Flex>
    </Card>
  );
};

export default UpcomingBookingCard;
