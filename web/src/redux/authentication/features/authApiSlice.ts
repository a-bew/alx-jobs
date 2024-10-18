import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "/auth/register",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),
        verifyEmail: builder.mutation({
            query: (token) => ({
                url: "/auth/verify-email",
                method: "POST",
                body: { token },
            }),
        }),
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: { email },
            }),
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: { ...data },
            }),
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/update-password",
                method: "POST",
                body: { ...data },
            }),
        })
    }),
})

export const { useLoginMutation, useRegisterMutation, useRefreshMutation, useVerifyEmailMutation } = authApiSlice