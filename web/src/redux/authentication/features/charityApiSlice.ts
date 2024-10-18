import { apiSlice } from "../api/apiSlice";

export const charityApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCharityListing: builder.query<any[], void>({
            query: () =>  "/home/charity-listing",
        }),
        getBoothListing: builder.query<any[], void>({
            query: () =>  "/booth/listing",
        })
    }),
})

export const { useGetCharityListingQuery, useGetBoothListingQuery } = charityApiSlice