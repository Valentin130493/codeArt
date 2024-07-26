import { API_ADD_REGISTER, API_GET_REGISTERS } from "../../static/api.ts";
import { message } from "antd";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../helpers/axiosConfig.ts";
import { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

export type createRegisterFormValues = {
  selectedForestId: string;
  requestBody: {
    registerName: string;
    currencyId: string;
  };
};
export type registerFormValues = {
  selectedForestId: string;
};

export interface Register {
  registerId: number;
  registerName: string;
  currencyId: number;
  currencyName: string;
  currencyCode: string;
  balance: number;
}

export interface RegisterState {
  error: null | unknown;
  register: Register[] | [];
  loading: boolean;
}

export const getRegisters: AsyncThunk<
  AxiosResponse<Register[]>,
  registerFormValues,
  AsyncThunkConfig
> = createAsyncThunk(
  "register/get",
  async (values: registerFormValues, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_GET_REGISTERS}`, {
        ...values,
      });

      message.success("success");
      return res;
    } catch (error) {
      message.error("something went wrong");
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
);

export const addRegisters: AsyncThunk<
  AxiosResponse<Register>,
  createRegisterFormValues,
  AsyncThunkConfig
> = createAsyncThunk(
  "register/add",
  async (values: createRegisterFormValues, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_ADD_REGISTER}`, {
        ...values,
      });

      message.success("success");
      console.log(res);
      return res;
    } catch (error) {
      message.error("something went wrong");
      return thunkAPI.rejectWithValue({ error: error });
    }
  },
);

const initialState: RegisterState = {
  error: null,
  register: [],
  loading: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisters: (state, action) => {
      const newItem = { ...action.payload, balance: 0 };
      state.register = [newItem, ...state.register];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRegisters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRegisters.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.register = payload.data;
    });
    builder.addCase(getRegisters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addRegisters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addRegisters.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addRegisters.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { setRegisters } = registerSlice.actions;

export default registerSlice.reducer;
