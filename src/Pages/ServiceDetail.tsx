import Container from "@/components/Container/Container";
import MyBanner from "@/components/ui/MyBanner";
import MyModel from "@/components/ui/MyModel";
import { currentToken } from "@/redux/features/auth/authSlice";
import {
  addCompareServie,
  compareService,
} from "@/redux/features/Compare/compareSlice";
import {
  useGetAServicesQuery,
  useGetServiceSlotsQuery,
} from "@/redux/features/Services/serviceApi";
import { setId } from "@/redux/features/slot/slotSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/ReduxHook";
import { TService, TSlot, TUser } from "@/Types";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, DatePicker, Skeleton, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const ServiceDetail = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const compareServiceData = useAppSelector(compareService);
  const [date, setDate] = useState(moment(new Date(Date.now())).toISOString());
  const { id } = useParams();
  const { data, isLoading } = useGetAServicesQuery(id);
  const {
    data: slots,
    isLoading: slotLoading,
    isFetching,
  } = useGetServiceSlotsQuery(
    {
      id,
      date,
    },
    { skip: !modal }
  );
  const token = useAppSelector(currentToken);
  const navigate = useNavigate();
  let user: TUser | null = null;

  if (token) {
    user = jwtDecode(token);
  }

  const handleSlot = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    setModal(true);
  };

  if (isLoading) {
    return <Skeleton />;
  }
  const handleCompare = () => {
    if (compareServiceData.item1?._id === id) {
      navigate("/service");
      return;
    }
    if (compareServiceData.item1?._id) {
      if (compareServiceData.item1?._id !== id) {
        dispatch(addCompareServie(data));
        navigate("/compare");
        return;
      }
    }
    dispatch(addCompareServie(data));
    navigate("/service");
  };
  const handleSlots = (id: string) => {
    if (user?.role === "admin") {
      toast.error("this is only for user");
      return;
    }
    dispatch(setId(id));
    navigate("/booking");
  };
  const serviceData: TService = data?.data;
  const slotData: TSlot[] = slots?.data;
  return serviceData ? (
    <>
      <MyBanner title="Service Detail" />
      <Container className="my-10">
        <div className="flex md:flex-row flex-col justify-center items-center gap-6">
          <div className="md:w-2/3">
            <img
              src={serviceData?.image}
              alt={serviceData?.name}
              className="w-full rounded-xl"
            />
          </div>
          <div className="md:w-1/3 sm:w-2/3">
            <div>
              <Button className="w-full mb-4" onClick={handleCompare}>
                {compareServiceData.item1?._id === id
                  ? "Compare with"
                  : "Compare"}
              </Button>
              <Button className="w-full" onClick={handleSlot}>
                Select A Slot
              </Button>
            </div>
            <Title level={4} className="flex flex-wrap justify-between !m-0">
              <span>Name:</span> <p>{serviceData?.name}</p>
            </Title>
            <div className="flex flex-wrap justify-between items-center">
              <Title level={5} className="!m-0">
                Price: ${serviceData?.price}
              </Title>
              <Title level={5} className="!m-0">
                Duration: {serviceData?.duration}min
              </Title>
            </div>
            <div className="flex flex-wrap">
              <Title level={5} className="mr-2">
                Description:{" "}
              </Title>
              <p>{serviceData?.description}</p>
            </div>
          </div>
        </div>
      </Container>
      <MyModel modal={modal} setModal={setModal} title={"Slots"} key={id}>
        {slotLoading || isFetching ? (
          <div className="flex justify-center my-6">
            <Spin
              indicator={<LoadingOutlined spin />}
              size="large"
              className="text-primary"
            />
          </div>
        ) : (
          <div>
            <DatePicker
              size="large"
              id="date"
              onChange={(d) => setDate(d.toISOString())}
              required={true}
              className="w-full border-primary focus:border-primary mb-4 hover:border-primary focus:outline-hover"
            />
            {slotData?.length ? (
              <div className="grid sm:grid-cols-2 gap-2">
                {slotData?.map((item) => (
                  <button
                    key={item?._id}
                    onClick={() => handleSlots(item?._id)}
                    className={`border border-primary rounded-md flex flex-col items-center py-4 ${
                      item?.isBooked === "booked" &&
                      "bg-gray-300 cursor-not-allowed"
                    }`}
                    disabled={item?.isBooked === "booked"}
                  >
                    <Title level={4} className="!m-0">
                      {moment(item?.date).format("L")}
                    </Title>
                    <Title level={5} className="!m-0">
                      {item?.startTime} min - {item?.endTime} min
                    </Title>
                  </button>
                ))}
              </div>
            ) : (
              <div className="capitalize text-center text-primary font-medium mt-10">
                no slot available this date
              </div>
            )}
          </div>
        )}
      </MyModel>
    </>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p className="text-primary capitalize font-bold text-xl">no data found</p>
    </div>
  );
};

export default ServiceDetail;
