import baseApi from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (req) => {
        const limit = req?.limit;
        let query = {};
        if (limit) {
          query = { ...query, limit };
        }
        return {
          url: "/services",
          params: query,
        };
      },
      providesTags: ["service"],
    }),
    createService: builder.mutation({
      query: (data) => ({
        url: "/services",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const { useCreateServiceMutation, useGetAllServicesQuery } = authApi;
