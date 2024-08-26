import { currentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks/ReduxHook";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(currentToken);

  if (token) {
    return children;
  }
  return <Navigate to="/login" replace></Navigate>;
};
export default PrivateRoute;
