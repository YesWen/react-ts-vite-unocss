import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import user from "./modules/user";
import tags from "./modules/tags";
import breadcrumb from "./modules/breadcrumb";

export const store = configureStore({
    reducer: { user, tags, breadcrumb },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
