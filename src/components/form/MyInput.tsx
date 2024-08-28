import { Input } from "antd";
import { Controller } from "react-hook-form";

type TMyInput = {
  type: string;
  name: string;
  required?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: any;
  disabled?: boolean;
};

const MyInput = ({
  type,
  name,
  required,
  className = "",
  label,
  placeholder,
  defaultValue,
  disabled,
}: TMyInput) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <>
          {label && (
            <label htmlFor={name} className="mb-2 capitalize font-semibold">
              {label} :
            </label>
          )}
          <div className="mb-5">
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              required={required}
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

export default MyInput;
