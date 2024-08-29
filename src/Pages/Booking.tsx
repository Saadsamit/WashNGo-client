import Container from "@/components/Container/Container";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import MyBanner from "@/components/ui/MyBanner";
import { useMyAccountQuery } from "@/redux/features/auth/authApi";
import { useCreateBookingMutation } from "@/redux/features/Booking/bookingApi";
import { useGetASlotQuery } from "@/redux/features/slot/slotApi";
import { currentSlotId, removeId } from "@/redux/features/slot/slotSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/ReduxHook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, Skeleton, Spin } from "antd";
import Title from "antd/es/typography/Title";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const vehicleTypes = [
  {
    value: "car",
    label: "Car",
  },
  {
    value: "truck",
    label: "Truck",
  },
  {
    value: "SUV",
    label: "SUV",
  },
  {
    value: "van",
    label: "Van",
  },
  {
    value: "motorcycle",
    label: "Motorcycle",
  },
  {
    value: "bus",
    label: "Bus",
  },
  {
    value: "electricVehicle",
    label: "Electric Vehicle",
  },
  {
    value: "hybridVehicle",
    label: "Hybrid Vehicle",
  },
  {
    value: "bicycle",
    label: "Bicycle",
  },
  {
    value: "tractor",
    label: "Tractor",
  },
];
const Booking = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("");
  const slotId = useAppSelector(currentSlotId);
  const { data: slotData, isLoading: slotIsLoading } = useGetASlotQuery(
    slotId,
    { skip: !slotId }
  );
  const [createBooking] = useCreateBookingMutation();
  const { data: userData, isLoading: userIsLoading } = useMyAccountQuery(
    {},
    { skip: !slotId }
  );
  let error = "No Data Available";

  if (slotIsLoading || userIsLoading) {
    return <Skeleton />;
  }
  if (!slotId) {
    error = "You don't Select Any Slot.";
  }
  const handleRemove = () => {
    dispatch(removeId());
    navigate("/");
  };
  const handleChange = (value: string) => {
    setVehicleType(value);
  };
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const BookingData = {
      serviceId: slotData?.data?.service?._id,
      slotId: slotData?.data?._id,
      bookingDate: slotData?.data?.date,
      vehicleType,
      vehicleBrand: data?.vehicleBrand,
      vehicleModel: data?.vehicleModel,
      manufacturingYear: Number(data?.manufacturingYear),
      registrationPlate: data?.registrationPlate,
    };
    try {
      setLoading(true);
      const result = await createBooking(BookingData).unwrap();
      if (result?.success) {
        setLoading(false);
        window.location.href = result?.data?.payment_url
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const dataResolver = z.object({
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.string(),
    registrationPlate: z.string(),
  });
  return (
    <>
      <MyBanner title="Booking" />
      <Container className="py-10">
        {slotData?.data ? (
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <div className="grid sm:grid-cols-3 border border-primary rounded-lg overflow-hidden">
                <div className="h-full sm:col-span-1 sm:block hidden">
                  <img
                    src={slotData?.data?.service?.image}
                    alt={slotData?.data?.service?.name}
                    className="h-full w-full"
                  />
                </div>
                <div className="sm:col-span-2 w-full p-4">
                  <div className="flex flex-wrap justify-between items-center">
                    <Title level={4} className="!m-0 !my-2">
                      Service: {slotData?.data?.service?.name}
                    </Title>
                    <Title level={5} className="!m-0 !my-2">
                      Date: {moment(slotData?.data?.date).format("L")}
                    </Title>
                  </div>
                  <div className="flex flex-wrap justify-between items-center">
                    <Title level={5} className="!m-0 !my-2">
                      Price: BDT {slotData?.data?.service?.price * 100}
                    </Title>
                    <Title level={5} className="!m-0 !my-2">
                      duration: {slotData?.data?.service?.duration}min
                    </Title>
                  </div>
                  <div className="flex flex-wrap justify-between items-center">
                    <Title level={5} className="!m-0 !my-2">
                      Start Time: {slotData?.data?.startTime}
                    </Title>
                    <Title level={5} className="!m-0 !my-2"></Title>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button
                      onClick={handleRemove}
                      className="!bg-red-500 hover:!bg-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border border-primary rounded-lg p-5">
              <Title level={4} className="!text-primary text-center">
                Booking Slot
              </Title>
              <MyForm
                onSubmit={handleSubmit}
                defaultValues={{
                  vehicleBrand: "Toyota",
                  vehicleModel: "Camry",
                  manufacturingYear: "2020",
                  registrationPlate: "ABC123",
                }}
                resolver={zodResolver(dataResolver)}
              >
                <MyInput
                  type="text"
                  name={"name"}
                  label="Name"
                  disabled
                  defaultValue={userData?.data?.name}
                />
                <MyInput
                  type="text"
                  name={"email"}
                  label="Email"
                  disabled
                  defaultValue={userData?.data?.email}
                />
                <label
                  htmlFor={"vehicleTypes"}
                  className="mb-2 capitalize font-semibold"
                >
                  vehicle Types
                </label>
                <div className="mb-1">
                  <Select
                    id="vehicleTypes"
                    className="placeholder:!text-primary mb-2 !border-primary focus:!border-primary hover:!border-primary focus:!outline-hover w-full"
                    onChange={handleChange}
                    options={vehicleTypes}
                  />
                </div>
                <MyInput
                  type="text"
                  name={"vehicleBrand"}
                  label="vehicle Brand"
                  required
                />
                <MyInput
                  type="text"
                  name={"vehicleModel"}
                  label="vehicle Model"
                  required
                />
                <MyInput
                  type="number"
                  name={"manufacturingYear"}
                  label="manufacturing Year"
                  required
                />
                <MyInput
                  type="text"
                  name={"registrationPlate"}
                  label="registration Plate"
                  required
                />
                <Button
                  htmlType="submit"
                  className="block w-full"
                  disabled={loading || !vehicleType}
                >
                  {loading ? (
                    <Spin tip="Loading" size="small" className=""></Spin>
                  ) : (
                    "Pay Now"
                  )}
                </Button>
              </MyForm>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-[300px]">
            <Title level={5}>{error}</Title>
            <Link to={"/service"}>
              <Button>Selete a Service</Button>
            </Link>
          </div>
        )}
      </Container>
    </>
  );
};

export default Booking;
