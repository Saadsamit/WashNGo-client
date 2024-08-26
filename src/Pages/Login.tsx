import MyForm from "@/components/form/MyForm";
import { Button, Flex, Spin } from "antd";
import MyInput from "./../components/form/MyInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Container from "@/components/Container/Container";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks/ReduxHook";
import { setUser } from "@/redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);
      const userData = await login(data).unwrap();
      if (userData?.success) {
        dispatch(setUser(userData));
        toast.success(userData?.message);
        navigate("/");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const loginScheme = z.object({
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(6),
  });
  return (
    <Container>
      <Flex justify="center" align="center" className="my-10">
        <MyForm
          className="border shadow-md p-4 rounded-xl w-96"
          onSubmit={handleSubmit}
          resolver={zodResolver(loginScheme)}
        >
          <div>
            <Title
              className="capitalize text-center !text-primary !mb-10"
              level={2}
            >
              login
            </Title>
          </div>
          <MyInput name="email" type="email" label="email" className="w-full" />
          <MyInput name="password" type="password" label="password" />
          <Button
            htmlType="submit"
            size="large"
            className="block w-full"
            disabled={loading}
          >
            {loading ? (
              <Spin tip="Loading" size="small" className=""></Spin>
            ) : (
              "Login"
            )}
          </Button>
          <p className="text-center mt-4">
            {"If You Don't Have Account"}{" "}
            <Link to="/signin" className="text-primary link-hover font-bold">
              signin
            </Link>
          </p>
        </MyForm>
      </Flex>
    </Container>
  );
};

export default Login;
