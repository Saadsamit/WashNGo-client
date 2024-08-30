import baseApi from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    cancelPayment: builder.query({
      query: (data) => ({
        url: `/payment/cancel/${data?.id}`,
      }),
    }),
  }),
});

export const { useCancelPaymentQuery } = paymentApi;
