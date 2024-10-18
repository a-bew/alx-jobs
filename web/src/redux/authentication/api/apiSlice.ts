import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/authSlice";
import { VITE_API_ENDPOINT_BASE_URL } from "../../../api/secrets";

// const baseQuery = fetchBaseQuery({
//     baseUrl: VITE_API_ENDPOINT_BASE_URL,
//     credentials: "include",
//     prepareHeaders: (headers, { getState }) => {
//         const token = (getState() as any).auth.token;
//         if (token) {
//             headers.set("authorization", `Bearer ${token}`);
//         }
//         return headers;
//     }
// });

const backoffDelays = [500, 2000, 5000];

const customBackOff = async (attempt = 0, maxRetries = 5) => {
    const attempts = Math.min(backoffDelays.length - 1, maxRetries);
  
    await new Promise(resolve => {
      setTimeout(resolve, backoffDelays[attempts]);
    });
  };

  const baseQuery = fetchBaseQuery({
    baseUrl: VITE_API_ENDPOINT_BASE_URL,
    
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const customBaseQuery = retry(
    baseQuery,
    { backoff: customBackOff, maxRetries: 5 }
  );


const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result:any = await baseQuery(args, api, extraOptions);
    // let result:any = await customBaseQuery(args, api, extraOptions);
    if (result?.error?.originalStatus === 403) {
        // send refresh token to get new access token
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            // retry the original query
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    keepUnusedDataFor: 24*60*60*1000,
    tagTypes: ["User"],
    endpoints: (builder) => ({}),
}) 
