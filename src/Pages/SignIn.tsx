import MyForm from "@/components/form/MyForm";
import { Button, Flex, Spin } from "antd";
import MyInput from "./../components/form/MyInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Container from "@/components/Container/Container";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSingInMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useState } from "react";
import MyTextArea from "@/components/form/MyTextArea";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [singIn] = useSingInMutation();
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);
      const userData = await singIn(data).unwrap();
      if (userData?.success) {
        toast.success(userData?.message);
        navigate("/login");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const SingInScheme = z.object({
    name: z.string({ required_error: "name is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "password is required" }).min(6),
    phone: z.string({ required_error: "phone is required" }),
    address: z.string({ required_error: "address is required" }),
  });
  return (
    <Container>
      <Flex justify="center" align="center" className="my-10">
        <MyForm
          className="border shadow-md p-4 rounded-xl w-96"
          onSubmit={handleSubmit}
          resolver={zodResolver(SingInScheme)}
        >
          <div>
            <Title
              className="capitalize text-center !text-primary !mb-10"
              level={2}
            >
              sign in
            </Title>
          </div>
          <MyInput name="name" type="text" label="name" className="w-full" />
          <MyInput name="email" type="email" label="email" className="w-full" />
          <MyInput
            name="phone"
            type="number"
            label="phone"
            className="w-full"
          />
          <MyInput name="password" type="password" label="password" />
          <MyTextArea name="address" label="address" />
          <Button
            htmlType="submit"
            size="large"
            className="block w-full"
            disabled={loading}
          >
            {loading ? (
              <Spin tip="Loading" size="small" className=""></Spin>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-center mt-4">
            {"If You Have A Account"}{" "}
            <Link to="/login" className="text-primary link-hover font-bold">
              login
            </Link>
          </p>
        </MyForm>
      </Flex>
    </Container>
  );
};

export default SignIn;
