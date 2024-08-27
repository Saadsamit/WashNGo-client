import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import MyTextArea from "@/components/form/MyTextArea";
import MyModel from "@/components/ui/MyModel";
import {
  useMyAccountQuery,
  useUpdateAccountMutation,
} from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Flex, Skeleton, Spin, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const MyAccount = () => {
  const [loading, setLoading] = useState(false);
  const { data: userData, isLoading, isError } = useMyAccountQuery(undefined);
  const [updateUser] = useUpdateAccountMutation();
  const [modal, setModal] = useState(false);
  if (isLoading || isError) {
    return <Skeleton />;
  }
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { name, phone, address } = data;
    const MyData = { name, phone, address };
    try {
      setLoading(true);
      const userData = await updateUser(MyData).unwrap();
      if (userData?.success) {
        toast.success(userData?.message);
        setModal(false)
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  const myAccountScheme = z.object({
    name: z.string({ required_error: "name is required" }),
    phone: z.number({ required_error: "phone is required" }),
    address: z.string({ required_error: "address is required" }),
  });
  return (
    <>
      <Flex
        justify="center"
        align="center"
        className="w-full min-h-[calc(100vh-130px)]"
      >
        <Card
          title={
            <Title level={3} className="text-center">
              My Account
            </Title>
          }
          className="!border-primary border sm:w-80"
        >
          <Flex justify="end">
            <Tag className="cursor-pointer" onClick={() => setModal(true)}>
              Edit
            </Tag>
          </Flex>
          <Flex vertical={true} align="center">
            <Title level={5} className="capitalize">
              {userData?.data?.name}
            </Title>
            <Tag
              className={`text-white capitalize ${
                (userData?.data?.role === "admin" && "bg-green-500") ||
                (userData?.data?.role === "user" && "bg-primary")
              }`}
            >
              {userData?.data?.role}
            </Tag>
            <Title level={5} className="capitalize">
              {userData?.data?.email}
            </Title>
          </Flex>
        </Card>
      </Flex>
      <MyModel modal={modal} setModal={setModal} title="info update">
        <MyForm
          onSubmit={handleSubmit}
          defaultValues={userData?.data}
          resolver={zodResolver(myAccountScheme)}
        >
          <MyInput name="name" type="text" label="name" className="w-full" />
          <MyInput
            name="phone"
            type="number"
            label="phone"
            className="w-full"
          />
          <MyTextArea name="address" label="address" />
          <Button
            htmlType="submit"
            size="large"
            className=" w-full"
            disabled={loading}
          >
            {loading ? <Spin tip="Loading" size="small"></Spin> : "Update"}
          </Button>
        </MyForm>
      </MyModel>
    </>
  );
};

export default MyAccount;
