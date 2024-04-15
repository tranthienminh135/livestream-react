import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Search {
  navBar: string;
}

interface initialCommonState {
  search: Search;
}

export const initialCommonState: initialCommonState = {
  search: {
    navBar: "",
  },
};

export const commnSlice = createSlice({
  name: "common",
  initialState: initialCommonState,
  reducers: {
    setSearch(state, action: PayloadAction<Search>) {
      state.search = action.payload;
    },
  },
});

export const commonActions = commnSlice.actions;

export const getSearch = (state: any) => state.common.search;

export default commnSlice.reducer;
