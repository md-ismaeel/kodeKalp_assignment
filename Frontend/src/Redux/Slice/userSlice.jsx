import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: [1, 3, 4, 5],
    isLogin: false
};

const userSlice = createSlice({
    name: "kodeKalp",
    initialState,
    reducers: {
        setUser: (state, actions) => {
            state.user = actions.payload;
        },
        setIsLogin: (state, actions) => {
            state.isLogin = actions.payload
        }
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
