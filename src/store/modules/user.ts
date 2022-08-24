import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "@/store/index";

export interface UserInfo {
    name: string;
    desc: string;
}
export interface State {
    userInfo: UserInfo;
}

const initialState: State = {
    userInfo: { name: "丢", desc: "雷" },
};

export const userAsync = createAsyncThunk("user/fetchCount", async (userInfo: UserInfo) => {
    return userInfo;
});

export const app = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<{ name: string; desc: string }>) {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userAsync.fulfilled, (state, actions) => {
            state.userInfo = actions.payload;
            // state.userInfo = action.payload;
            // state.userInfo = action;
            // console.log(action.payload, "----action==");
        });
    },
});

export const { setUserInfo } = app.actions;

export const getUserInfo = (state: RootState) => state.user.userInfo;

export const incrementIfOdd = (userInfo: object): AppThunk => (dispatch, getState) => {
    const currentValue = getUserInfo(getState());

    console.log(currentValue, "-----affter");

    // dispatch(incrementByAmount(amount));

    console.log(currentValue, "-----befor");
};

export default app.reducer;
