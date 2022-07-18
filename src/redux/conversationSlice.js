import {createSlice} from "@reduxjs/toolkit"

const conversationSlice = createSlice({
    name:"conversation",
    initialState:{
        conversationId:null,
        personName:null,
        personImage:null,
        mobileView:false,
    },reducers:{
        selectConversation : (state,action)=>{
            state.conversationId = action.payload.convId
            state.personName = action.payload.name
            state.personImage = action.payload.image
        },
        toggleMobileView: (state,action)=>{
            state.mobileView = action.payload.view
        },
        resetStates:(state)=>{
            state.conversationId = null
            state.personName = null
            state.personImage = null
        }
    }
})
export const {selectConversation,resetStates,toggleMobileView} = conversationSlice.actions;
export default conversationSlice.reducer;