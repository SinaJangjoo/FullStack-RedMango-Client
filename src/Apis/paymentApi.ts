import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7296/api/", //Here we are defining the base URL
    prepareHeaders: (headers: Headers, api) => {
      const token = localStorage.getItem("token");
      token && headers.append("Authorization", "Bearer " + token);
    },
  }),
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (userId) => ({
        url: "payment",
        method:"POST",
        params:{
          userId:userId
        }
      }),
    }),
    
  }),
});

export const {useInitiatePaymentMutation} = paymentApi  // These are the default action that are created automatically when we work with our Query
export default paymentApi;