import Container from "../Container/Container";
import image from "@/assets/review.png";
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
import { FaXmark } from "react-icons/fa6";

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
    limit: 2,
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
      <div className="relative sm:p-4 p-2">
        <div className="md:flex items-center">
          <div className="lg:w-2/3 md:w-1/2 md:block sm:hidden">
            <img src={image} alt="" />
          </div>
          <div className="lg:w-1/3 md:w-1/2">
            <div className="text-end mb-4">
              <Link
                to={"/reviews"}
                className="capitalize border-primary border rounded-md hover:bg-primary hover:text-white px-2"
              >
                see more
              </Link>
            </div>
            <div className="grid gap-6">
              {data?.data?.map((item: TReview) => (
                <ReviewCard data={item} />
              ))}
            </div>
            <div className="mt-5">
              {token ? (
                user?.role === "user" &&
                !data?.feedbackExsit && (
                  <Button onClick={openModal}>Give a Rating</Button>
                )
              ) : (
                <Button onClick={openLoginModal}>Give a Rating</Button>
              )}
            </div>
          </div>
        </div>
        <div className={`absolute inset-0 rounded-lg h-full ${modal2 || 'hidden'}`}>
          <div className="flex justify-center items-center h-full">
            <div className="absolute inset-0 opacity-65 bg-black rounded-lg"></div>
            <button
              className="absolute top-6 right-6 font-bold text-xl text-white"
              onClick={() => setModal2(false)}
            >
             <FaXmark />
            </button>
            <Link to={"/login"}>
              <Button className="my-4 min-w-48" size="large">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
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
