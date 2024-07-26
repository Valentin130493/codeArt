import axios, { AxiosResponse } from "axios";

import { API_LOGIN, API_LOGOUT, API_URL } from "../../static/api.ts";
import { message } from "antd";
import { FormValues } from "../../components/auth/types.ts";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axiosInstance from "../../helpers/axiosConfig.ts";
import { TOKEN, USER } from "../../static/storage.ts";

export interface Forest {
  forestId: string;
  forestName: string;
}

export interface UserData {
  appUserId: number;
  username: string;
  firstName: string;
  surname: string;
  languageId: number;
  phone: string;
  isActive: boolean;
  appUserTypeId: number;
  errorCounter: number;
  lockDate: string | null;
  forestIds: Forest[];
}

export interface UserState {
  error: null | unknown;
  user: UserData;
  loading: boolean;
}

export const authLogin: AsyncThunk<
  Promise<UserData>,
  FormValues,
  AsyncThunkConfig
> = createAsyncThunk("auth/login", async (values: FormValues, thunkAPI) => {
  try {
    const res = await axios.post(
      `${API_URL}${API_LOGIN}`,
      {
        requestBody: {
          ...values,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    message.success("Login success");
    localStorage.setItem(TOKEN, `${res.headers[TOKEN]}`);
    localStorage.setItem(USER, JSON.stringify(res.data.data));
    return await res.data;
  } catch (error) {
    message.error("something went wrong");
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const authLogout: AsyncThunk<
  AxiosResponse<null, null>,
  void,
  AsyncThunkConfig
> = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.post(`${API_LOGOUT}`);

    message.success("Logout success");
    localStorage.setItem(TOKEN, "");
    localStorage.setItem(USER, "");
    return res;
  } catch (error) {
    message.error("something went wrong");
    return thunkAPI.rejectWithValue({ error: error });
  }
});
const activeUser = localStorage.getItem(USER);

const initialUser = {
  appUserId: 50,
  username: "yusuf",
  firstName: "yusuf",
  surname: "yusuf",
  languageId: 1,
  phone: "111111",
  isActive: true,
  appUserTypeId: 1,
  errorCounter: 0,
  lockDate: null,
  forestIds: [
    {
      forestId: 2,
      forestName: "Call",
    },
  ],
};
const initialState: UserState = {
  error: null,
  user: activeUser ? JSON.parse(activeUser) : initialUser,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      state.user = payload;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(authLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authLogout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
