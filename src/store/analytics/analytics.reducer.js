import {createSlice} from "@reduxjs/toolkit";

const initialState = {

    bookings: null,
    users: null,
    hairstyles: null,
    reviews: null,
    yOffset: false,

}

export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setAnalytics(state, {payload}) {
            Object.entries(payload).forEach(([key, value]) => {
                if (key === 'bookings') {
                    state.bookings = Object.values(value[0]).flat();
                } else {
                    state[key] = value;
                }
            });
        }
    }
})

export const {setAnalytics} = analyticsSlice.actions
export const analyticsReducer = analyticsSlice.reducer

