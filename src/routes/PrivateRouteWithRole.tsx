import { currentToken, logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/ReduxHook";
import { TUser } from "@/Types";
import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TPrivateRouteWithRole = {
  admin?: ReactNode;
  user?: ReactNode;
};

const PrivateRouteWithRole = ({ admin, user }: TPrivateRouteWithRole) => {
  const token = useAppSelector(currentToken);
  const dispatch = useAppDispatch();

  if (token) {
    const data: TUser = jwtDecode(token);
    if (data?.role === "admin") {
      if (!admin) {
        return <Navigate to="/" replace></Navigate>;
      }
      return admin;
    } else if (data?.role === "user") {
      if (!user) {
        return <Navigate to="/" replace></Navigate>;
      }
      return user;
    } else {
      dispatch(logout());
    }
  }
  return <Navigate to="/login" replace></Navigate>;
};

export default PrivateRouteWithRole;
