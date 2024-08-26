import { ReactNode } from "react";

type TContainer = {
  className?: string;
  children: ReactNode;
};
const Container = ({ className = "", children }: TContainer) => {
  return (
    <div
      className={`max-w-screen-xl mx-auto px-6 pb-24 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;