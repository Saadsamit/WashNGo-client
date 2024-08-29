import MyBanner from "@/components/ui/MyBanner";
import Title from "antd/es/typography/Title";
import { Button, Flex, Row, Select, Skeleton } from "antd";
import Container from "@/components/Container/Container";
import ServiceCard from "@/components/ui/ServiceCard";
import { useGetAllServicesQuery } from "@/redux/features/Services/serviceApi";
import { TService } from "@/Types";
import { useState } from "react";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { FieldValues, SubmitHandler } from "react-hook-form";

const priceSorting = [
  {
    value: "price",
    label: "Low to High",
  },
  {
    value: "-price",
    label: "High to Low",
  },
];
const durationSorting = [
  {
    value: "duration",
    label: "Low to High",
  },
  {
    value: "-duration",
    label: "High to Low",
  },
];

const Services = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetAllServicesQuery({ sort, search });
  if (isLoading) {
    return <Skeleton />;
  }
  const handleChange = (value: string) => {
    setSort(value);
  };
  const handleSubmit: SubmitHandler<FieldValues> = (value) => {
    setSearch(value?.search);
  };
  return (
    <div>
      <MyBanner title="services" />
      <Title className="capitalize text-center !text-primary !my-10" level={2}>
        our Services
      </Title>
      <Container>
        <Flex
          className="mb-4"
          wrap={true}
          justify="space-between"
          align="center"
        >
          <MyForm onSubmit={handleSubmit} className="flex gap-1">
            <MyInput name="search" type="text" placeholder="search" />
            <Button>Search</Button>
          </MyForm>
          <Flex vertical={true} className="gap-4">
            <Select
              className="placeholder:!text-primary"
              placeholder={"by Price"}
              style={{ width: 120 }}
              onChange={handleChange}
              options={priceSorting}
            />
            <Select
              placeholder={"by duration"}
              style={{ width: 120 }}
              onChange={handleChange}
              options={durationSorting}
            />
          </Flex>
        </Flex>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {data?.data?.map((item: TService) => (
            <ServiceCard data={item} key={item._id}/>
          ))}
        </div>
        <Row className="gap-6" justify={"center"}></Row>
      </Container>
    </div>
  );
};

export default Services;
