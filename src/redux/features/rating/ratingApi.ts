import baseApi from "@/redux/api/baseApi";

const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRating: builder.query({
      query: ({ email, limit }) => {
        let query = {};
        if (email) {
          query = { ...query, email };
        }
        if (limit) {
          query = { ...query, limit };
        }

        return {
          url: `/rating/all`,
          params: query,
        };
      },
      providesTags: ["rating"],
    }),
    createRating: builder.mutation({
      query: (data) => ({
        url: `/rating`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rating"],
    }),
  }),
});

export const { useCreateRatingMutation, useGetAllRatingQuery } = ratingApi;
