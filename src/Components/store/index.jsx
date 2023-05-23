import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './auth'
import PremiumReducer from "./Premium";

const store =configureStore({
  reducer:{
      auth:authSliceReducer,
      Premium:PremiumReducer
    }
})

export default store;