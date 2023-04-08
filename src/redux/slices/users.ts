import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface State {
  username: string;
}
const initialState: State = {
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { addUserName } = userSlice.actions;

export const selectUserName = (state: RootState) => state.user.username;

export default userSlice.reducer;
