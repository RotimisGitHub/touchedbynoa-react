import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    newYear: new Date().getFullYear(),
    newMonth: new Date().getMonth(),
    initialYear: new Date().getFullYear(),
    initialMonth: new Date().getMonth(),
    date: null,
    pageState: 0,
    selectedSizes: {
        length: null,
        thickness: null
    },
    hairstyleTitle: null,
    hairstyleImage: null,
    hairstyleDuration: null,
    hairstylePrice: null,
    appointmentTime: {
        start: null,
        end: null
    },
    time: null,
    year: null,
    month: null
};


export const calendarSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setChosenDate(state, action) {
            const [chosenYear, currentMonth, chosenDate] = action.payload
            const refactoredDate = new Date(chosenYear, currentMonth, chosenDate);

            state.pageState += 1
            state.date = refactoredDate
        },
        setChosenTime(state, {payload}) {
            const [hours, minutes, seconds] = payload.time
            const updatedDate = new Date(payload.date);
            updatedDate.setHours(hours, minutes, seconds);

            const appointmentEnd = new Date(new Date(updatedDate).setHours(updatedDate.getHours() + payload.date.hairstyleDuration)) ?? null
            const appointmentMonth = new Date(payload.date.year, payload.date.month).toLocaleString('default', {
                month: 'long'
            });
            state.pageState += 1
            state.date = updatedDate
            state.appointmentTime.start = String(updatedDate)
            state.appointmentTime.end = appointmentEnd
            state.time = hours
            state.month = appointmentMonth
        },
        setMonthAndYear(state, {payload}) {
            state.year = payload.newYear
            state.month = payload.newMonth
        },
        setSelectedSizes(state, {payload}) {
            state.selectedSizes[payload.type] = payload.value
        },
        setHairstyle(state, {payload}) {
            const {modalAction, product} = payload
            state.hairstyleTitle = product.hairstyleTitle
            state.hairstyleImage = product.imageFile
            state.hairstyleDuration = product.duration
            state.hairstylePrice = product.price
            state.open = modalAction === 'open'
        }
    }
})

export const {setChosenDate, setChosenTime, setHairstyle, setMonthAndYear, setSelectedSizes} = calendarSlice.actions
export const calendarReducer = calendarSlice.reducer