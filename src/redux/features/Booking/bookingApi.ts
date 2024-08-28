import baseApi from "@/redux/api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
        url: `/bookings`,
      }),
      providesTags: ["booking"],
    }),
    getMyBooking: builder.query({
      query: () => ({
        url: "/my-bookings",
      }),
      providesTags: ["booking"],
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetMyBookingQuery,
} = bookingApi;
