import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        admin:false,
    },
    reducers:{
        isAdmin:(state,action)=>{
            state.admin=action.payload;
        }
    }
})

export const {isAdmin}=userSlice.actions;
export default userSlice.reducer;
