export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
}

export const getStartDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
}

export const hairstylesSizes = [
    "X Small",
    "Small",
    "Medium",
    "Large",
    "X Large"
];

export const months = [
    {name: "January", shortName: "Jan"},
    {name: "February", shortName: "Feb"},
    {name: "March", shortName: "Mar"},
    {name: "April", shortName: "Apr"},
    {name: "May", shortName: "May"},
    {name: "June", shortName: "Jun"},
    {name: "July", shortName: "Jul"},
    {name: "August", shortName: "Aug"},
    {name: "September", shortName: "Sep"},
    {name: "October", shortName: "Oct"},
    {name: "November", shortName: "Nov"},
    {name: "December", shortName: "Dec"},
];

export const daysOfWeek = [
    {name: "Sunday", shortName: "Sun"},
    {name: "Monday", shortName: "Mon"},
    {name: "Tuesday", shortName: "Tue"},
    {name: "Wednesday", shortName: "Wed"},
    {name: "Thursday", shortName: "Thu"},
    {name: "Friday", shortName: "Fri"},
    {name: "Saturday", shortName: "Sat"},
];

const timeRange = Array.from({length: 8})

export const availableTimes = timeRange.flatMap((_, index) => {

    const timeFrame = new Date();
    const HalfTimeFrame = new Date();
    timeFrame.setHours(9 + index, 0, 0, 0);
    HalfTimeFrame.setHours(index + 9, 30, 0, 0);

    return (
        [
            timeFrame.toLocaleTimeString(),
            HalfTimeFrame.toLocaleTimeString()
        ]
    )


})
