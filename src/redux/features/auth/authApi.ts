import baseApi from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
    singIn: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),
    }),
    myAccount: builder.query({
      query: () => ({
        url: "/auth/myAccount",
      }),
      providesTags: ["auth"],
    }),
    updateAccount: builder.mutation({
      query: (data) => ({
        url: "/auth/updateAccount",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useLoginMutation, useSingInMutation, useMyAccountQuery,useUpdateAccountMutation } =
  authApi;
