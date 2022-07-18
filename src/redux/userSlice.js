import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        loggedIn:false,
        isFetching:false,
        error:false,
        data:null,
        token:null
    },reducers:{
        loginStart:(state)=>{
            state.loggedIn = false
            state.isFetching = true
            state.error = false
        },
        loginSuccess:(state,action)=>{
            console.log(action)
            state.loggedIn = true
            state.isFetching = false
            state.error = false
            state.data = action.payload.user
            state.token = action.payload.token
        },
        loginFail:(state)=>{
            state.loggedIn = false
            state.isFetching = false
            state.error = true
        },
        logout:(state)=>{
            state.loggedIn=false
            state.isFetching=false
            state.error=false
            state.data=null
            state.token=null
        }
    }
})

export const {loginStart,loginFail,loginSuccess,logout} = userSlice.actions
export default userSlice.reducer