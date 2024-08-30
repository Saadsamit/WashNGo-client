import {
  Button,
  DatePicker,
  Select,
  Skeleton,
  Spin,
  Table,
  TimePicker,
} from "antd";
import type { TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { TService, TSlot } from "@/Types";
import toast from "react-hot-toast";
import { useGetAllServicesQuery } from "@/redux/features/Services/serviceApi";
import {
  useCreateSlotMutation,
  useGetSlotQuery,
  useUpdateSlotStatusMutation,
} from "@/redux/features/slot/slotApi";
import { ReactNode, useState } from "react";
import MyModel from "@/components/ui/MyModel";
import moment from "moment";

type TCombined = {
  children?: TSlot[];
} & TService;

type DataTypeChildren = {
  key: string;
  image: ReactNode;
  name: string;
  price: string;
  action: ReactNode;
};

interface DataType {
  key: string;
  image: ReactNode;
  name: string;
  price: number;
  duration: number;
  action?: ReactNode;
  children?: DataTypeChildren[] | null;
}

const slotTable = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { name }) => <Title level={5}>{name}</Title>,
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (_, { price }) => (
        <Title level={5}>
          {typeof price === "number" ? `$ ${price}` : `End Time: ${price}`}
        </Title>
      ),
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      render: (_, { duration }) => (
        <Title level={5}>{duration && `${duration} min`}</Title>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];
  return columns;
};

const slotStatus = [
  {
    value: "available",
    label: "Available",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];
const SlotManagement = () => {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState<string | string[] | null>(null);
  const [startTime, setStartTime] = useState<string | string[] | null>(null);
  const [endTime, setEndTime] = useState<string | string[] | null>(null);

  const { data: serviceData, isLoading: serviceLoading } =
    useGetAllServicesQuery({});
  const { data: slotData, isLoading: slotLoading } = useGetSlotQuery({});
  const [updateSlotStatus] = useUpdateSlotStatusMutation();
  const [createSlot] = useCreateSlotMutation();
  const columns = slotTable();

  if (serviceLoading || slotLoading) {
    return <Skeleton />;
  }
  const slotStatusChange = async (status: string, id: string) => {
    const result = await updateSlotStatus({ status, id }).unwrap();
    if (result?.success) {
      toast.success(result?.message);
    }
  };

  const slotDataChange = async (id: string) => {
    setModal(true);
    setServiceId(id);
  };

  const handleSubmit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      const result = await createSlot({
        date,
        startTime,
        endTime,
        service: serviceId,
      }).unwrap();
      if (result?.success) {
        toast.success(result?.message);
        setModal(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const combined: TCombined[] = serviceData?.data?.map((service: TService) => ({
    ...service,
    children: slotData?.data?.filter(
      (slot: TSlot) => slot?.service?._id === service?._id
    ),
  }));
  const tableData: DataType[] = combined?.map((item: TCombined) => ({
    key: item?._id,
    image: <img src={item?.image} alt={item?.image} className="w-12" />,
    name: item?.name,
    price: item?.price,
    duration: item?.duration,
    action: item?.children?.length ? (
      ""
    ) : (
      <Button onClick={() => slotDataChange(item?._id)}>Create Slot</Button>
    ),
    children: item?.children?.length
      ? item?.children?.map((slotItem: TSlot) => ({
          key: slotItem?._id,
          image: (
            <Title level={5}>Date: {moment(slotItem?.date).format("L")}</Title>
          ),
          name: `Start Time: ${slotItem?.startTime}`,
          price: slotItem?.endTime,
          action: (
            <Select
              defaultValue={slotItem?.isBooked}
              style={{ width: 120 }}
              onChange={(e) => slotStatusChange(e, slotItem?._id)}
              options={slotStatus}
            />
          ),
        }))
      : null,
  }));
  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 550 }}
      />
      <MyModel modal={modal} setModal={setModal} title="create slot">
        <form onSubmit={handleSubmit} key={serviceId}>
          <div className="mb-5">
            <label htmlFor={"date"} className="mb-2 capitalize font-semibold">
              Date :
            </label>
            <DatePicker
              size="large"
              id="date"
              onChange={(d) => setDate(d.toISOString())}
              required={true}
              className="w-full border-primary focus:border-primary  hover:border-primary focus:outline-hover"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor={"startTime"}
              className="mb-2 capitalize font-semibold"
            >
              Start Time :
            </label>
            <TimePicker
              size="large"
              key={"startTime"}
              id="startTime"
              required={true}
              onChange={(_d, dateString) => setStartTime(dateString)}
              className="w-full border-primary focus:border-primary  hover:border-primary focus:outline-hover"
              format="HH:mm"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor={"EndTime"}
              className="mb-2 capitalize font-semibold"
            >
              End Time :
            </label>
            <TimePicker
              size="large"
              key={"EndTime"}
              id="EndTime"
              required={true}
              onChange={(_d, dateString) => setEndTime(dateString)}
              className="w-full border-primary focus:border-primary  hover:border-primary focus:outline-hover"
              format="HH:mm"
            />
          </div>

          <Button className="w-full" htmlType="submit">
            {loading ? (
              <Spin tip="Loading" size="small" className=""></Spin>
            ) : (
              "Add Slot"
            )}
          </Button>
        </form>
      </MyModel>
    </>
  );
};

export default SlotManagement;
