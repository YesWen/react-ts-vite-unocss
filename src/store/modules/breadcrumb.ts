import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "@/store/index";
import { routerList } from "@/router";

export interface State {
    keyPath: Array<string>;
}

const initialState: State = {
    keyPath: [],
};

export const breadcrumbAsync = createAsyncThunk("breadcrumb", async () => {});

export const breadcrumb = createSlice({
    name: "breadcrumb",
    initialState,
    reducers: {
        setKeyPath(state, action: PayloadAction<Array<string>>) {
            state.keyPath = action.payload;
        },
        handleBreadcrumb() {},
    },
    extraReducers: (builder) => {
        builder.addCase(breadcrumbAsync.fulfilled, (state, actions) => {});
    },
});

export const { setKeyPath } = breadcrumb.actions;

export const getKeyPath = (state: RootState) => state.breadcrumb.keyPath;

export const handleBreadcrumb = (path: string): AppThunk => (dispatch, getState) => {
    const p = path.split("/").slice(1);
    const getKeyPath = (arr, index) => {
        let item = "";
        for (let i = 0; i <= index; i++) {
            item = item + "/" + arr[i];
        }
        return item;
    };
    let keyPath = p.map((item, index) => {
        index == 0 ? (item = "/" + item) : (item = getKeyPath(p, index));
        return item;
    });
    dispatch(setKeyPath(keyPath));
};

export default breadcrumb.reducer;
