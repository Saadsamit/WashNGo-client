import config from "@/config";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import toast from "react-hot-toast";
import { logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: config.serverUrl,
  credentials: "include",
  prepareHeaders: (header, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      header.set("authorization", `Bearer ${token}`);
    }
    return header;
  },
});

const handleErrorWithBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(logout);
    toast.error(result?.error?.data?.message);
  }

  if (result?.error?.status !== 401) {
    toast.error(result?.error?.data?.message);
  }

  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: handleErrorWithBaseQuery,
  endpoints: () => ({}),
});

export default baseApi;
