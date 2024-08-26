import MyForm from "@/components/form/MyForm";
import { Button, Flex } from "antd";
import MyInput from "./../components/form/MyInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Container from "@/components/Container/Container";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks/ReduxHook";
import { setUser } from "@/redux/features/auth/authSlice";

const Login = () => {
    const dispatch = useAppDispatch()
  const obj = {
    email: "web@programming-hero.com",
    password: "ph-password",
  };
  const [login] = useLoginMutation();
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = await login(data).unwrap();
    if(userData?.success){
        dispatch(setUser(userData))
    }
    console.log(userData);
  };
  const loginScheme = z.object({
    email: z.string({ required_error: "email is required" }).email(),
    password: z.string({ required_error: "email is password" }).min(6),
  });
  return (
    <Container>
      <Flex justify="center" align="center" className="h-[calc(100vh-87px)]">
        <MyForm
          className="border shadow-md p-4 rounded-xl w-96"
          onSubmit={handleSubmit}
          resolver={zodResolver(loginScheme)}
          defaultValues={obj}
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
          <Button htmlType="submit" size="large" className="block w-full">
            Login
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
