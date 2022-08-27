import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginValues } from "Interfaces/Login";
import { User } from "Interfaces/User";
import authAPI from "Services/authAPI";

interface State {
  user: User | null;
  errorLogin: string | null;
  isLoading: boolean;
}

const initialState: State = {
  user: JSON.parse(localStorage.getItem("user") as string) || null,
  errorLogin: null,
  isLoading: false,
};

export const getUser = createAsyncThunk(
  "auth/login",
  async (values: LoginValues, { rejectWithValue }) => {
    try {
      const data = await authAPI.getUser(values);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.setItem("user", JSON.stringify(null));
      localStorage.setItem("isLoginSuccess", JSON.stringify(null));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.isLoading = false;

      if (typeof payload === "string") state.errorLogin = payload;
    });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
