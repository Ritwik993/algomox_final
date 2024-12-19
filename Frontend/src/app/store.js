import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../utils/CategorySlice";
import userSlice  from "../utils/userSlice";

export const store = configureStore({
  reducer: {
    categorySlice : CategorySlice,
    user: userSlice,
    },
});