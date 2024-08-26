import { Input } from "antd";
import { Controller } from "react-hook-form";

type TMyTextArea = {
  name: string;
  className?: string;
  label?: string;
};

const MyTextArea = ({
  name,
  className = "",
  label,
}: TMyTextArea) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          {label && (
            <label htmlFor={name} className="mb-2 capitalize font-semibold">
              {label} :
            </label>
          )}
          <div className="mb-5">
            <Input.TextArea
              rows={3}
              {...field}
              id={name}
              className={`border-primary focus:border-primary  hover:border-primary focus:outline-hover ${className}`}
            />
            {error && (
              <small className="text-red-600 capitalize">{error.message}</small>
            )}
          </div>
        </>
      )}
    />
  );
};

export default MyTextArea;
