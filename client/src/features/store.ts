import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import modalSlice from "./modal/modalSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalSlice,
  },
})
