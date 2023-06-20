import { createSlice } from "@reduxjs/toolkit";
const intialvalue={check:false,amount:0}

const premiumSlice=createSlice({
    name:'Premium',
    initialState:intialvalue,
    reducers:{
        getAmount(state,action){
          state.amount=action.payload
          if(state.amount>=10000)
          state.check=true;
          else
          state.check=false;
        }
    }
})

export const PremiumActions=premiumSlice.actions;

export default premiumSlice.reducer;