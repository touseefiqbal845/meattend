import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import discountReducer from "./redux-tookit/Discount-Redux/slice";
import staffReducer from "./redux-tookit/Staffs-Redux/slice";


export const store = configureStore({
  reducer: {
    discount: discountReducer,
    staff: staffReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
