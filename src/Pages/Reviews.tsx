import Container from "@/components/Container/Container";
import ReviewCard from "@/components/home/ReviewCard";
import MyBanner from "@/components/ui/MyBanner";
import { useGetAllRatingQuery } from "@/redux/features/rating/ratingApi";
import { TReview } from "@/Types";
import { Skeleton } from "antd";
import Title from "antd/es/typography/Title";

const Reviews = () => {
  const { data, isLoading } = useGetAllRatingQuery({});

  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <>
      <MyBanner title="Review" />
      <Container className="my-20">
        <Title
          className="capitalize text-center !text-primary !mb-10"
          level={2}
        >
          Reviews
        </Title>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-6">
          {data?.data?.map((item: TReview) => (
            <ReviewCard data={item} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Reviews;
