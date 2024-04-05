import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppRole {
  roleName: String;
}

export interface UserInformation {
  userName: string;
  fullName: string;
  appRole: AppRole;
}

interface initialUserState {
  info: UserInformation;
}

export const initialUserInfoState: initialUserState = {
  info: {
    userName: "",
    fullName: "",
    appRole: {
      roleName: "",
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserInfoState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInformation>) {
      state.info = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const getUserInfo = (state: any) => state.user.info;

export default userSlice.reducer;
