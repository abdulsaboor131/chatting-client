import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name : "alert",
    initialState:{
        visible:false,
        type:null,
        message:""
    },reducers:{
        showAlert:(state,action)=>{
            state.visible = true;
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        hideAlert:(state)=>{
            state.visible = false;
            state.type = null;
            state.message = "";
        }
    }
})

export const {showAlert , hideAlert} = alertSlice.actions
export default alertSlice.reducer