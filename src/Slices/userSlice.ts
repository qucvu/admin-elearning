import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserRegister } from "Interfaces/User";
import userAPI from "../Services/userAPI";

interface State {
  user: UserRegister | null;
  errorRegister: string;
  userList: User[];
  errorGetList: string | null;
  searchText: string;
}

const initialState: State = {
  user: null,
  errorRegister: "",
  userList: [],
  searchText: "",
  errorGetList: null,
};

export const addUser = createAsyncThunk(
  "user/add",
  async (values: UserRegister, { rejectWithValue }) => {
    try {
      const data = await userAPI.addUser(values);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const getUserList = createAsyncThunk(
  "user/getList",
  async (values?: string) => {
    try {
      const data = await userAPI.getUserList(values);
      return data;
    } catch (e) {
      throw e;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userName: string, { rejectWithValue }) => {
    try {
      await userAPI.deleteUser(userName);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateUSer = createAsyncThunk(
  "user/updateUser",
  async (payload: UserRegister, { rejectWithValue }) => {
    try {
      await userAPI.updateUser(payload);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleSearch: (state, { payload }) => {
      // if (!payload || payload === "") {
      //   return (state.searchText = null);
      // } else
      state.searchText = payload;
    },
  },
  extraReducers: (builder) => {
    // add user
    builder.addCase(addUser.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
    builder.addCase(addUser.rejected, (state, { payload }) => {
      state.errorRegister = payload as any;
    });
    // get userlist
    builder.addCase(getUserList.fulfilled, (state, { payload }) => {
      state.userList = payload;
    });
    builder.addCase(getUserList.rejected, (state, { payload }) => {
      if (typeof payload === "string") state.errorGetList = payload;
    });
  },
});

export const { handleSearch } = userSlice.actions;
export default userSlice.reducer;
