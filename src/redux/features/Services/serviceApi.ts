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
    getAServices: builder.query({
      query: (id) => {
        return {
          url: `/services/${id}`,
        };
      },
      providesTags: ["service"],
    }),
    getServiceSlots: builder.query({
      query: (data) => {
        return {
          url: `/services/slots/${data?.id}/${data?.date}`,
        };
      },
      providesTags: ["service"],
    }),
    updateService: builder.mutation({
      query: (data) => ({
        url: `/services/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: ["service"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
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

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetAServicesQuery,
  useGetServiceSlotsQuery,
} = authApi;
