import { createSlice } from "@reduxjs/toolkit";
const intialvalue={check:false}

const premiumSlice=createSlice({
    name:'Premium',
    initialState:intialvalue,
    reducers:{
        yes(state){
          state.check=true
        },
        no(state){
          state.check=false
        }
    }
})

export const PremiumActions=premiumSlice.actions;

export default premiumSlice.reducer;