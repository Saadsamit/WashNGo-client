import Title from "antd/es/typography/Title";
import Container from "../Container/Container";
import { useAppSelector } from "@/redux/hooks/ReduxHook";
import { currentToken } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { Button, Flex, Rate, Skeleton, Spin } from "antd";
import { useState } from "react";
import MyModel from "../ui/MyModel";
import {
  useCreateRatingMutation,
  useGetAllRatingQuery,
} from "@/redux/features/rating/ratingApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import { TReview } from "@/Types";

const Rating = () => {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [value, setValue] = useState(3);
  const [loading, setLoading] = useState(false);
  const token = useAppSelector(currentToken);
  const [createRating] = useCreateRatingMutation();
  let user: any = {};
  if (token) {
    user = jwtDecode(token);
  }

  const { data, isLoading } = useGetAllRatingQuery({
    email: user?.email,
    limit: 4,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  const openModal = () => {
    setModal(true);
  };
  const openLoginModal = () => {
    setModal2(true);
  };
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const feedback = form?.feedback?.value;
    const result = await createRating({ feedback, rating: value }).unwrap();
    if (result?.success) {
      setLoading(false);
      toast.success(result?.message);
      setModal(false);
    }
    setLoading(false);
  };
  return (
    <Container className="mb-20">
      <Title className="capitalize text-center !text-primary !mb-10" level={2}>
        Reviews
      </Title>
      <div className="text-end mb-4">
        <Link
          to={"/reviews"}
          className="capitalize border-primary border rounded-md hover:bg-primary hover:text-white px-2"
        >
          see more
        </Link>
      </div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-6">
        {data?.data?.map((item: TReview) => (
          <ReviewCard data={item} />
        ))}
      </div>
      <div className="text-center">
        {token ? (
          user?.role === "user" &&
          !data?.feedbackExsit && (
            <Button onClick={openModal}>Give a Rating</Button>
          )
        ) : (
          <Button onClick={openLoginModal}>Give a Rating</Button>
        )}
      </div>

      <MyModel modal={modal2} setModal={setModal2} title="Need to login first">
        <div>
          <Link to={"/signin"}>
            <Button className="w-full my-4" size="large" type="text">
              Sign In
            </Button>
          </Link>
          <div className="flex justify-around items-center px-4">
            <div className="bg-primary h-[2px] w-2/5"></div>
            <p className="text-center">or</p>
            <div className="bg-primary h-0.5 w-2/5"></div>
          </div>
          <Link to={"/login"}>
            <Button className="w-full my-4" size="large">
              Login
            </Button>
          </Link>
        </div>
      </MyModel>
      <MyModel modal={modal} setModal={setModal} title="Give a Rating">
        <form onSubmit={handleSubmit}>
          <Flex gap="middle" vertical className="!mt-3">
            <Rate onChange={setValue} value={value} />
          </Flex>
          <div className="my-5">
            <textarea
              name="feedback"
              placeholder="Feedback"
              required
              className="border-primary !border-2 rounded-md w-full px-2 py-2 hover:border-primary focus:outline-hover"
            />
          </div>
          <Button className="w-full" htmlType="submit">
            {loading ? (
              <Spin tip="Loading" size="small" className=""></Spin>
            ) : (
              "Add Review"
            )}
          </Button>
        </form>
      </MyModel>
    </Container>
  );
};

export default Rating;
