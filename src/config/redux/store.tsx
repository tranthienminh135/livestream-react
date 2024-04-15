import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slide/user-slice";
import cartSlice from "./slide/cart-slice";
import commonSlice from "./slide/common-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    common: commonSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
