import {combineReducers} from "@reduxjs/toolkit";
import {calendarReducer} from "./calendar/calendar.reducer";
import {userReducer} from "./user/user.reducer";
import {hairstylesReducer} from "./hairstyles/hairstyles.reducer";
import {analyticsReducer} from "./analytics/analytics.reducer";

const rootReducer = combineReducers(
    {
        calendar: calendarReducer,
        user: userReducer,
        hairstyles: hairstylesReducer,
        analytics: analyticsReducer
    }
)

export default rootReducer;