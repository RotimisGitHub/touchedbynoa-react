// user.reducer.js

import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    role: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser (state, {payload}) {

            state.currentUser = payload.user;
            state.role = payload.role;
        },
        clearUser (state) {
            state.currentUser = null
            state.role = null
        }
    }
})

export const {setCurrentUser, clearUser} = userSlice.actions
export const userReducer = userSlice.reducer

