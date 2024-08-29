import { TReview } from "@/Types";
import { Card, Flex, Rate } from "antd";

const ReviewCard = ({ data }: { data: TReview }) => {
  return (
    <Card style={{ minWidth: 300 }}>
      <Card.Meta
        avatar={
          <p className="bg-primary text-white size-10 flex justify-center items-center text-xl font-semibold rounded-full">{data?.user?.name?.slice(0,1)}</p>
        }
        title={data?.user?.name}
        description={
          <>
            <Flex gap="middle" vertical className="!mt-3">
              <Rate disabled value={data?.rating} />
            </Flex>
            <p>{data?.feedback}</p>
          </>
        }
      />
    </Card>
  );
};

export default ReviewCard;
