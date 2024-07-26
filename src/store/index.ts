import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./userSlice/userSLice.ts";
import registerSlice from "./registers/registersSlice.ts";
import remaindersSlice from "./remainders/remaildersSlice.ts";

export const store = configureStore({
  reducer: {
    user: userSlice,
    registers: registerSlice,
    remainders: remaindersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
