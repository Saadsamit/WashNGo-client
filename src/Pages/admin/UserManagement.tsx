import { ReactNode } from "react";
import { Select, Skeleton, Table, Tag } from "antd";
import type { TableProps } from "antd";
import Title from "antd/es/typography/Title";
import {
  useAllUserQuery,
  useRoleUpdateMutation,
} from "@/redux/features/auth/authApi";
import { TAllUserData } from "@/Types";
import toast from "react-hot-toast";

interface DataType {
  key: string;
  name: ReactNode;
  email: ReactNode;
  role: string;
  action: { id: string; role: string };
}

const userTable = (onChange: (role: string, id: string) => Promise<void>) => {
  const userRole = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "user",
      label: "User",
    },
  ];

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (_, { role }) => (
        <Tag
          className={`text-white capitalize ${
            (role === "admin" && "bg-green-500") ||
            (role === "user" && "bg-primary")
          }`}
          key={role}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, { action }) => (
        <Select
          defaultValue={action?.role}
          placeholder={"Role"}
          style={{ width: 120 }}
          onChange={(e) => onChange(e, action?.id)}
          options={userRole}
        />
      ),
    },
  ];
  return columns;
};

const UserManagement = () => {
  const { data, isLoading } = useAllUserQuery(undefined);
  const [roleUpdate] = useRoleUpdateMutation();

  const handleChange = async (role: string, id: string) => {
    const updateData = await roleUpdate({ role, id }).unwrap();
    if (updateData?.success) {
      toast.success(updateData?.message);
    }
  };
  const columns = userTable(handleChange);

  if (isLoading) {
    return <Skeleton />;
  }

  const tableData: DataType[] = data?.data?.map((item: TAllUserData) => ({
    key: item?._id,
    name: <Title level={5}>{item?.name}</Title>,
    email: <Title level={5}>{item?.email}</Title>,
    role: item?.role,
    action: { id: item?._id, role: item?.role },
  }));

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      scroll={{ x: 550 }}
    />
  );
};

export default UserManagement;
