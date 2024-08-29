import UpcomingBookingCard from "@/components/UpcomingBookingCard";
import { useGetMyBookingQuery } from "@/redux/features/Booking/bookingApi";
import { TBooking } from "@/Types";
import { Skeleton } from "antd";

const UpcomingBooking = () => {
  const { data, isLoading } = useGetMyBookingQuery({
    mode: "upcoming",
  });
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <div>
      {data?.data.length ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
          {data?.data?.map((item: TBooking) => (
            <UpcomingBookingCard data={item} key={item?._id} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p className="capitalize">no data available </p>
        </div>
      )}
    </div>
  );
};

export default UpcomingBooking;
