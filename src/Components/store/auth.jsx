import { createSlice } from "@reduxjs/toolkit";

const intialAuthState={
    isAuthenticated:!!localStorage.getItem("email")
}

const authSlice=createSlice({
    name:'authentication',
    initialState:intialAuthState,
    reducers:{
      convert:(state)=>{
        state.isAuthenticated=!state.isAuthenticated
      }
    }
})

export const authActions=authSlice.actions;

export default authSlice.reducer;