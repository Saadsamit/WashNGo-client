import { Input } from "antd";
import { Controller } from "react-hook-form";

type TMyInput = {
  type: string;
  name: string;
};

const MyInput = ({ type, name }: TMyInput) => {
  return (
    <Controller
      name={name}
      render={({ field }) => <Input {...field} type={type} id={name} />}
    />
  );
};

export default MyInput;
