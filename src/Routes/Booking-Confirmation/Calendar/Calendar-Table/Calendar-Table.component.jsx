import './Calendar-Table.styles.scss'
import {useContext, useState} from "react";
import {CalendarContext} from "../../../../Context/CalendarProvider.component";


const CalendarTable = ({daysOfWeek, daysInMonth, startOfWeek, chosenYear, currentMonth}) => {
    const [isSelected, setSelected] = useState(null)

    const {setFullDateVariable} = useContext(CalendarContext)

    const handleStartDate = (start, startOfMonth, tableData) => {
        if (start >= startOfMonth) {
            return (
                tableData
            )
        } else {
            return ''
        }
    }

    const handleChosenDate = (event) => {
        const chosenDate = Number(event.target.title);
        setSelected(chosenDate);

        setFullDateVariable(prev => ({
            ...prev,
            pageState: prev.pageState + 1,
            date: new Date(chosenYear, currentMonth, chosenDate)
        }));


    };


    return (
        <table>
            <thead>
            <tr>
                {
                    daysOfWeek.map(day => {
                        return (
                            <th className={'calender-table-header'}>
                                {day.shortName}
                            </th>
                        )
                    })
                }
            </tr>
            </thead>
            <tbody>
            {
                [0, 1, 2, 3, 4].map((row) => {
                    const weekNumbers = Array.from({length: 7})

                    return (
                        <tr>
                            {

                                weekNumbers.map((_, column) => {
                                    const dateNumber = Array.from({length: daysInMonth}, (_, i) => i + 1)[column + (row * 7)];
                                    const tableData =
                                        <span title={dateNumber} onClick={handleChosenDate}
                                              className={isSelected === dateNumber ? 'selected-date' : ''}>{dateNumber}</span>

                                    return (

                                        <td>
                                            {
                                                handleStartDate(dateNumber, startOfWeek, tableData)
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )

                })
            }

            </tbody>
        </table>
    )
}

export default CalendarTable;