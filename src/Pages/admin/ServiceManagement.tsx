import { Button, Modal, Skeleton, Spin, Table } from "antd";
import type { TableProps } from "antd";
import Title from "antd/es/typography/Title";
import { TService } from "@/Types";
import toast from "react-hot-toast";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/features/Services/serviceApi";
import MyModel from "@/components/ui/MyModel";
import { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";

interface DataType {
  key: string;
  image: string;
  name: string;
  price: number;
  duration: number;
  action: {
    item: TService;
    handleDetele: any;
    handleUpload: (data: TService) => void;
  };
}

const serviceTable = () => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, { image }) => (
        <img src={image} alt={image} className="w-12" />
      ),
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
      render: (_, { price }) => <Title level={5}>$ {price}</Title>,
    },
    {
      title: "Duration",
      key: "duration",
      dataIndex: "duration",
      render: (_, { duration }) => <Title level={5}>{duration} min</Title>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, { action }) => (
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => action?.handleUpload(action.item)}>
            Update
          </Button>
          <Button
            className="!bg-red-700"
            onClick={() => action?.handleDetele(action?.item?._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return columns;
};
// image name price duration
const ServiceManagement = () => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [service, setService] = useState<TService>();
  const { data: serviceData, isLoading } = useGetAllServicesQuery({});
  const [updateService] = useUpdateServiceMutation();
  const [createService] = useCreateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const onSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const image = form?.image?.value;
    const name = form?.name?.value;
    const description = form?.description?.value;
    const price = Number(form?.price?.value);
    const duration = Number(form?.duration?.value);
    const data = { image, name, description, price, duration };
    const result: any = await updateService({
      id: service?._id,
      data,
    }).unwrap();
    if (result?.success) {
      toast.success(result?.message);
      setLoading(false);
      setModal(false);
    }
    setLoading(false);
  };
  const onSubmit2 = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const image = form?.image?.value;
    const name = form?.name?.value;
    const description = form?.description?.value;
    const price = Number(form?.price?.value);
    const duration = Number(form?.duration?.value);
    const data = { image, name, description, price, duration };
    const result: any = await createService(data).unwrap();
    if (result?.success) {
      toast.success(result?.message);
      setLoading(false);
      setModal2(false);
      form.reset();
    }
    setLoading(false);
  };
  const handleUpload = (data: TService) => {
    setService(data);
    setModal(true);
  };

  const handleDetele = async (id: string) => {
    Modal.confirm({
      title: "Are you sure delete this?",
      icon: <ExclamationCircleFilled />,
      okButtonProps: { className: "!bg-red-500 !text-white" },
      okText: "Yes",
      cancelText: "No",
      centered: true,
      onOk() {
        return new Promise((resolve, reject) => {
          deleteService(id)
            .unwrap()
            .then((data) => {
              if (data?.success) {
                toast.success(data?.message);
                resolve("");
              }
            })
            .catch((err) => reject(err.message));
        }).catch(() => console.log("Oops errors!"));
      },
    });
  };

  const columns = serviceTable();

  if (isLoading) {
    return <Skeleton />;
  }
  const tableData: DataType[] = serviceData?.data?.map((item: TService) => ({
    key: item?._id,
    image: item?.image,
    name: item?.name,
    price: item?.price,
    duration: item?.duration,
    action: { item: item, handleDetele, setModal, handleUpload },
  }));
  return (
    <>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 550 }}
      />
      <div className="fixed right-5 bottom-10">
        <Button className="text-xl" onClick={() => setModal2(true)}>
          +
        </Button>
      </div>
      <MyModel modal={modal} setModal={setModal} title=" update service">
        <form onSubmit={onSubmit} key={service?.name}>
          <div className="mb-5">
            <label htmlFor={"name"} className="mb-2 capitalize font-semibold">
              Name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={service?.name}
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <div className="mb-5">
            <label htmlFor={"image"} className="mb-2 capitalize font-semibold">
              Image :
            </label>
            <input
              type="text"
              id="image"
              name="image"
              defaultValue={service?.image}
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <div className="mb-5">
            <label htmlFor={"price"} className="mb-2 capitalize font-semibold">
              Price :
            </label>
            <input
              type="number"
              id="price"
              name="price"
              defaultValue={service?.price}
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor={"duration"}
              className="mb-2 capitalize font-semibold"
            >
              Duration :
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              defaultValue={service?.duration}
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor={"description"}
              className="mb-2 capitalize font-semibold"
            >
              Description :
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={service?.description}
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <Button
            htmlType="submit"
            size="large"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Spin tip="Loading" size="small" className=""></Spin>
            ) : (
              "Update Service"
            )}
          </Button>
        </form>
      </MyModel>
      <MyModel modal={modal2} setModal={setModal2} title="add service">
        <form onSubmit={onSubmit2} key={service?.name}>
          <div className="mb-5">
            <label htmlFor={"name"} className="mb-2 capitalize font-semibold">
              Name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <div className="mb-5">
            <label htmlFor={"image"} className="mb-2 capitalize font-semibold">
              Image :
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <div className="mb-5">
            <label htmlFor={"price"} className="mb-2 capitalize font-semibold">
              Price :
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor={"duration"}
              className="mb-2 capitalize font-semibold"
            >
              Duration :
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor={"description"}
              className="mb-2 capitalize font-semibold"
            >
              Description :
            </label>
            <textarea
              id="description"
              name="description"
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <Button
            htmlType="submit"
            size="large"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Spin tip="Loading" size="small" className=""></Spin>
            ) : (
              "Add Service"
            )}
          </Button>
        </form>
      </MyModel>
    </>
  );
};

export default ServiceManagement;
