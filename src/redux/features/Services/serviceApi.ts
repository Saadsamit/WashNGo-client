import baseApi from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllServices: builder.query({
      query: (req) => {
        const limit = req?.limit;
        let query = {};
        const sort = req?.sort;
        const search = req?.search;

        if (limit) {
          query = { ...query, limit };
        }
        if (sort) {
          query = { ...query, sort };
        }
        if (search) {
          query = { ...query, search };
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
