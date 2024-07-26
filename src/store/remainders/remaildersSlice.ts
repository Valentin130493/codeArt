import {
  API_ADD_REMINDER,
  API_GET_REMAINDERS,
  API_UPDATE_REMINDER_STATUS,
} from "../../static/api.ts";
import { message } from "antd";
import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../helpers/axiosConfig.ts";
import { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";

export type updateRemainderStatusFormValues = {
  selectedForestId: string;
  requestBody: {
    reminderId: string;
    status: string;
  };
};
export type createRemainderFormValues = {
  selectedForestId: string;
  requestBody: {
    date: string;
    content: string;
    title: string;
    isPersonal: boolean;
    isGeneral: boolean;
  };
};
export type gerRemindersFormValues = {
  selectedForestId: string;
  requestBody: {
    startDate: string;
    endDate: string;
    status: string;
  };
};

export interface Reminder {
  reminderId: number;
  forestId: number;
  title: string;
  content: string;
  date: string;
  status: number;
  createUserName: string;
  updateUserName: string | null;
  isPersonal: boolean;
  isGeneral: boolean;
}

export interface RegisterState {
  error: null | unknown;
  reminders: Reminder[] | [];
  selectedRemainder: null | number;
  loading: boolean;
}

export const getRemainders: AsyncThunk<
  AxiosResponse<Reminder[]>,
  gerRemindersFormValues,
  AsyncThunkConfig
> = createAsyncThunk(
  "remainders/get",
  async (values: gerRemindersFormValues, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_GET_REMAINDERS}`, {
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

export const addRemainder: AsyncThunk<
  AxiosResponse<Reminder>,
  createRemainderFormValues,
  AsyncThunkConfig
> = createAsyncThunk(
  "remainders/add",
  async (values: createRemainderFormValues, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_ADD_REMINDER}`, {
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
export const updateRemainderStatus: AsyncThunk<
  AxiosResponse<Reminder>,
  updateRemainderStatusFormValues,
  AsyncThunkConfig
> = createAsyncThunk(
  "remainders/update",
  async (values: updateRemainderStatusFormValues, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`${API_UPDATE_REMINDER_STATUS}`, {
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
const initialState: RegisterState = {
  error: null,
  reminders: [],
  selectedRemainder: null,
  loading: false,
};

export const remaindersSlice = createSlice({
  name: "remainders",
  initialState,
  reducers: {
    setRemainders: (state, action) => {
      const newItem = { ...action.payload };
      state.reminders = [newItem, ...state.reminders];
    },
    setSelectedRemainder: (state, action) => {
      state.selectedRemainder = action.payload;
    },
    updateCurrentRemainderStatus: (state, action) => {
      const updatedArr = state.reminders.map((item) => {
        if (item.reminderId === action.payload.reminderId) {
          return {
            ...item,
            status: action.payload.status,
          };
        } else {
          return item;
        }
      });

      state.reminders = updatedArr;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRemainders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRemainders.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.reminders = payload.data;
    });
    builder.addCase(getRemainders.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(addRemainder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addRemainder.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addRemainder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateRemainderStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateRemainderStatus.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateRemainderStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  setRemainders,
  setSelectedRemainder,
  updateCurrentRemainderStatus,
} = remaindersSlice.actions;

export default remaindersSlice.reducer;
