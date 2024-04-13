import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Cart {
  size: number;
}

interface initialCartState {
  cart: Cart;
}

export const initialCartState: initialCartState = {
  cart: {
    size: 0,
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload;
    },
    setCartSize(state, action: PayloadAction<number>) {
      state.cart.size = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export const getCart = (state: any) => state.cart.cart;

export const getCartSize = (state: any) => state.cart.cart.size;

export default cartSlice.reducer;
