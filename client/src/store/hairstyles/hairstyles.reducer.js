import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    collection: null
}
export const hairstyleSlice = createSlice({
    name: 'hairstyle',
    initialState,
    reducers: {
        setAllHairstyles(state, action) {
            state.collection = action.payload
        }
    }
})

export const {setAllHairstyles} = hairstyleSlice.actions
export const hairstylesReducer = hairstyleSlice.reducer

