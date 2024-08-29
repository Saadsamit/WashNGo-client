import MyModel from "@/components/ui/MyModel";
import { useGetMyBookingQuery } from "@/redux/features/Booking/bookingApi";
import { TBooking } from "@/Types";
import { Button, Skeleton, Table, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  service: string;
  email: ReactNode;
  startTime: string;
  endTime: string;
  action: ReactNode;
}

const BookingTable = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
      render: (_, { service }) => <Title level={5}>{service}</Title>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, { email }) => <Title level={5}>{email}</Title>,
    },
    {
      title: "Start Time",
      key: "startTime",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      key: "endTime",
      dataIndex: "endTime",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];
  return columns;
};

const PastBooking = () => {
  const { data, isLoading } = useGetMyBookingQuery({
    mode: "past",
  });
  const [booking, setBooking] = useState<TBooking | null>(null);
  const [modal, setModal] = useState(false);

  const columns = BookingTable();
  if (isLoading) {
    return <Skeleton />;
  }
  const handleClick = (item: TBooking) => {
    setBooking(item);
    setModal(true);
  };
  const tableData: DataType[] = data?.data?.map((item: TBooking) => ({
    key: item?._id,
    service: item?.service?.name,
    email: item?.customer?.email,
    startTime: item?.slot?.startTime,
    endTime: item?.slot?.endTime,
    action: <Button onClick={() => handleClick(item)}>Details</Button>,
  }));
  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 550 }}
      />
      <MyModel
        modal={modal}
        setModal={setModal}
        title={booking?.service?.name as string}
      >
        <div className="">
          <Title level={4}>Customer: {booking?.customer?.name}</Title>
          <Title level={5}>
            Date: {moment(booking?.slot?.date).format("L")}
          </Title>
          <Title level={5}>Phone: {booking?.customer?.phone}</Title>
          <Title level={5}>Price: ${booking?.service?.price}</Title>
          <Title level={5}>
            Time: {booking?.slot?.startTime} - {booking?.slot?.endTime}
          </Title>
          <Title level={5}>
            Address: <address>{booking?.customer?.address}</address>
          </Title>
          <Link to={`/service/${booking?.service?._id}`}>
            <Button className="w-full">View Service</Button>
          </Link>
        </div>
      </MyModel>
    </>
  );
};

export default PastBooking;
