import { RootState } from "@/app/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        roles: []
    },
    reducers: {
        setCredentials: (state, action: PayloadAction<any>) => {
            const { user, accessToken, roles } = action.payload;
            state.user = user;
            state.token = accessToken;
            if (roles){
                state.roles = roles;
            }
        },
        login: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const selectCurrentToken = (state: RootState) => state.auth.token;

export const selectUserAuth = (state: RootState) => state.auth;
