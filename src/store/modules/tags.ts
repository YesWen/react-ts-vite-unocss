import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "@/store/index";
import { routerList } from "@/router";

import { getCacheTagsList, setCacheTagsList } from "@/utils/auth";

export interface State {
    tags_list: { label: string; path: string }[];
    activated: string;
    currentLabel: string;
    isDelete: boolean;
}

const initialState: State = {
    tags_list: [],
    activated: "",
    currentLabel: "",
    isDelete: false,
};

export const tagsAsync = createAsyncThunk("tags", async (path: string) => {
    return path;
});

const getLabel = (routes, path) => {
    let currentLabel = "";
    const loop = (routes, path) => {
        a: for (let item of routes) {
            if (item.path == path) {
                currentLabel = item.label;
            }
            if (item.children) {
                loop(item.children, path);
            }
            if (currentLabel) {
                break a;
            }
        }
    };
    loop(routes, path);
    return currentLabel;
};

export const tags = createSlice({
    name: "tags",
    initialState,
    reducers: {
        setTagsList(state, action: PayloadAction<{ label: string; path: string }>) {
            state.currentLabel = action.payload.label;
            state.tags_list.push({ label: state.currentLabel, path: action.payload.path });
            state.tags_list.forEach((item, index) => {
                if (item.path == action.payload.path) {
                    state.activated = item.path;
                }
            });
        },
        deleteTags(state, action: PayloadAction<{ currnetPath: string; deletePath: string; path: string; index: number }>) {
            if (action.payload.path == "/index") return;
            state.tags_list.splice(action.payload.index, 1);
            if (action.payload.currnetPath == action.payload.deletePath) {
                state.isDelete = true;
            }
        },
        toggleActivated(state, action: PayloadAction<string>) {
            state.activated = action.payload;
        },
        resetIsDelete(state) {
            state.isDelete = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(tagsAsync.fulfilled, (state, action) => {
            // console.log(action.payload);
            // const rootPath = routerList.map((item) => item.path);
            // const tags = state.tags_list.map((item) => item.path);
            // state.tags_list.forEach((item, index) => {
            //     if (item.path == action.payload) {
            //         console.log(item.path == action.payload);
            //         toggleActivated(index);
            //     }
            // });
            // if (rootPath.includes(action.payload)) return;
            // if (!tags.includes(action.payload)) {
            //     state.currentLabel = getLabel(routerList, action.payload);
            //     state.tags_list.push({ label: state.currentLabel, path: action.payload });
            // }
        });
    },
});

export const { setTagsList, deleteTags, toggleActivated, resetIsDelete } = tags.actions;

export const getTagsList = (state: RootState) => state.tags.tags_list;
export const getActivated = (state: RootState) => state.tags.activated;
export const getCurrentLabel = (state: RootState) => state.tags.currentLabel;
export const getIsDelete = (state: RootState) => state.tags.isDelete;

export const asyncSetTags = (path): AppThunk => (dispatch, getState) => {
    const rootPath = routerList.map((item) => item.path);
    const tags = getTagsList(getState()).map((item) => item.path);
    tags.forEach((item, index) => {
        if (item == path) {
            dispatch(toggleActivated(item));
        }
    });
    if (rootPath.includes(path)) return;
    if (!tags.includes(path)) {
        dispatch(setTagsList({ label: getLabel(routerList, path), path: path }));
    }
};

export default tags.reducer;
