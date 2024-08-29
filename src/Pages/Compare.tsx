import Container from "@/components/Container/Container";
import {
  compareService,
  removeCompareServie,
} from "@/redux/features/Compare/compareSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/ReduxHook";
import { Button, Table } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";

const compareTable = () => {
  const columns: any = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
      render: (text: string) => (
        <strong className="capitalize">{text} :</strong>
      ),
    },
    {
      title: "Item 1",
      dataIndex: "item1",
      key: "item1",
      align: "center",
    },
    {
      title: "Item 2",
      dataIndex: "item2",
      key: "item2",
      align: "center",
    },
  ];
  return columns;
};

const Compare = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const compareData = useAppSelector(compareService);
  if (!compareData.item1 || !compareData.item2) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Title level={4}>no data available</Title>
        <Link to={"/service"}>
          <Button>Select Service</Button>
        </Link>
      </div>
    );
  }
  const columns = compareTable();

  const keysToInclude = ["name", "price", "duration", "description"];
  const data: any = {
    item1: compareData.item1,
    item2: compareData.item2,
  };
  const tableData: any = keysToInclude.map((key) => ({
    key,
    attribute: key,
    item1: data.item1?.[key],
    item2: data.item2?.[key],
  }));
  const handleClick = () => {
    dispatch(removeCompareServie());
    navigate("/");
  };
  return (
    <Container className="my-20">
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 550 }}
        bordered={true}
        rowKey="key"
      />
      <div className="mt-10 flex justify-center">
        {" "}
        <Button onClick={handleClick}>Go Back</Button>
      </div>
    </Container>
  );
};

export default Compare;
