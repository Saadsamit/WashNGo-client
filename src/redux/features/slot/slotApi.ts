import baseApi from "@/redux/api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSlot: builder.query({
      query: () => ({
        url: `/slots/availability`,
      }),
      providesTags: ["slot"],
    }),
    updateSlotStatus: builder.mutation({
      query: (data) => ({
        url: `/slots/updateSlotStatus/${data?.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["slot"],
    }),
    createSlot: builder.mutation({
      query: (data) => ({
        url: "/services/slots",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["slot", "service"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useUpdateSlotStatusMutation,
  useGetSlotQuery,
} = slotApi;
