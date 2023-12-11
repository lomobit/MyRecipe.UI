import './index.css';
import {Fragment, useState} from "react";
import {Button, FormControl, IconButton, MenuItem, Select, Stack} from '@mui/material';
import * as React from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const monthNames = new Map<number, string>([
    [0, "Январь"],
    [1, "Февраль"],
    [2, "Март"],
    [3, "Апрель"],
    [4, "Май"],
    [5, "Июнь"],
    [6, "Июль"],
    [7, "Август"],
    [8, "Сентябрь"],
    [9, "Октябрь"],
    [10, "Ноябрь"],
    [11, "Декабрь"],
]);

const events = [
    {
        name: "Сплав1",
        startAt: new Date(2023, 10, 26),
        finishAt: new Date(2023, 10, 28),
        color: "red"
    },
    {
        name: "Поход в горы",
        startAt: new Date(2023, 10, 30),
        finishAt: new Date(2023, 11, 2),
        color: "rgb(107,199,98)"
    },
    {
        name: "Сплав2",
        startAt: new Date(2023, 11, 4),
        finishAt: new Date(2023, 11, 6),
        color: "rgb(94,66,141)"
    },
    {
        name: "Сплав3",
        startAt: new Date(2023, 11, 5),
        finishAt: new Date(2023, 11, 7)
    },
    {
        name: "Сплав4",
        startAt: new Date(2023, 11, 23),
        finishAt: new Date(2023, 11, 26),
        color: "violet"
    },
    {
        name: "Сплав5",
        startAt: new Date(2023, 11, 30),
        finishAt: new Date(2024, 0, 2),
        color: "green"
    },
    {
        name: "Сплав6",
        startAt: new Date(2023, 11, 9),
        finishAt: new Date(2023, 11, 15),
        color: "rgb(191,201,19)"
    },
];

const getCurrentMonth = (month: number, year: number) => {
    /*
    * Данная константа определяет первый день недели в календаре
    *
    * 0 - суббота
    * 1 - воскресенье
    * 2 - понедельник
    * 3 - вторник
    * 4 - среда
    * 5 - четверг
    * 6 - пятница
    * */
    const firstDayCooficient = 2;
    const daysInTheWeek = 7;
    const weeksToShow = 6;

    let firstDayOfMonthIndex = new Date(year, month, 1).getDay();

    let result: CalendarDay[][] = [];
    let tempWeek: CalendarDay[] = [];

    for (let i = 0 + firstDayCooficient; i < daysInTheWeek * weeksToShow + firstDayCooficient; i++) {
        let tempDate = new Date(year, month, i - firstDayOfMonthIndex);
        tempWeek.push({
            date: tempDate.getDate(),
            month: tempDate.getMonth(),
            year: tempDate.getFullYear()
        });
    }

    for (let i = 0; i < weeksToShow; i++) {
        let temp = [];
        for (let j = 0; j < daysInTheWeek; j++) {
            temp.push(tempWeek[i * daysInTheWeek + j]);
        }
        result.push(temp);
    }

    return result;
}

const today = new Date();
const todayMonth = getCurrentMonth(today.getMonth(), today.getFullYear());

declare interface CalendarDay {
    date: number;
    month: number;
    year: number;
}

const Events = () => {

    const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState<Array<Array<CalendarDay>>>(todayMonth);

    const cellWidth = 107;
    const eventWidth = 100;

    const getNumberOfCommonDays = (event: any, firstItem: any, lastItem: any) => {
        let start1 = event.startAt;
        let end1 = event.finishAt;
        let start2 = new Date(firstItem.year, firstItem.month, firstItem.date);
        let end2 = new Date(lastItem.year, lastItem.month, lastItem.date);

        if (end1 < start2 || end2 < start1) {
            return 0;
        }

        const commonStart = start1 < start2 ? start2 : start1;
        const commonEnd = end1 < end2 ? end1 : end2;
        const commonDays = Math.ceil((commonEnd.getTime() - commonStart.getTime()) / (1000 * 60 * 60 * 24));

        return commonDays + 1;
    }

    const getEventWidth = (cellsCount: number) => {
        return (cellWidth * (cellsCount - 1)) + eventWidth;
    }

    const onPreviousDatePeriodClick = () => {
        let nextMonth = selectedMonth - 1;
        let nextYear = selectedYear;
        if (nextMonth < 0)
        {
            nextMonth = 11;
            nextYear -= 1;
        }

        setSelectedMonth(nextMonth);
        setSelectedYear(nextYear);

        setCurrentMonth(getCurrentMonth(nextMonth, nextYear));
    }

    const onNextDatePeriodClick = () => {
        let nextMonth = selectedMonth + 1;
        let nextYear = selectedYear;
        if (nextMonth > 11)
        {
            nextMonth = 0;
            nextYear += 1;
        }

        setSelectedMonth(nextMonth);
        setSelectedYear(nextYear);

        setCurrentMonth(getCurrentMonth(nextMonth, nextYear));
    }

    const onGotoTodayClick = () => {
        let nextMonth = today.getMonth();
        let nextYear = today.getFullYear();

        setSelectedMonth(nextMonth);
        setSelectedYear(nextYear);

        setCurrentMonth(getCurrentMonth(nextMonth, nextYear));
    }

    const getMarginLeftForEvent = (startAt: Date, startWeek: CalendarDay) => {
        debugger;
        let startWeekDate = new Date(startWeek.year, startWeek.month, startWeek.date);

        if (startWeekDate >= startAt) return 0;

        return (new Date(startAt.getTime() - startWeekDate.getTime()).getDate() - 1) * cellWidth;
    }

    return (
        <Fragment>
            <h1>События</h1>

            <div className="eventsButtons">
                <Stack direction="row" spacing={1} className="changePeriodButtons">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={onGotoTodayClick}
                    >
                        Сегодня
                    </Button>
                    <IconButton
                        aria-label="previousDatePeriod"
                        color="default"
                        onClick={onPreviousDatePeriodClick}
                    >
                        <ArrowBackIosNewIcon
                            fontSize='small'/>
                    </IconButton>
                    <IconButton
                        aria-label="nextDatePeriod"
                        color="default"
                        onClick={onNextDatePeriodClick}
                    >
                        <ArrowForwardIosIcon
                            fontSize='small' />
                    </IconButton>
                    <h2 style={{ color: "dimgray" }}>
                        {monthNames.get(selectedMonth)} {selectedYear}
                    </h2>


                </Stack>
                <Stack direction="row-reverse" spacing={1} className="managePeriodButtons">
                    <FormControl
                        sx={{ minWidth: 60 }}
                        size="small"
                    >
                        <Select
                            value={2}
                            onChange={() => alert('Функционал временно недоступен.')}
                            inputProps={{ 'aria-label': 'Выбрать период' }}
                        >
                            <MenuItem value={1} disabled>Неделя</MenuItem>
                            <MenuItem value={2}>Месяц</MenuItem>
                            <MenuItem value={3} disabled>Год</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </div>

            <div className="mainCalendarGrid" style={{height: "120px", marginTop: "20px"}}>
                {
                    currentMonth.map((week, index) => (
                        <div key={index} style={{
                            display: "flex",
                            position: "relative",
                            height: "100%",
                            minHeight: "40px",
                            borderTop: "1px solid lightgray",
                            borderLeft: "1px solid lightgray",
                            textAlign: "justify",
                            justifyContent: "space-between",
                            textAlignLast: "justify"
                        }}>
                            {
                                week.map((day, index) => (
                                    <div
                                        key={`${day.month}${day.date}`}
                                        style={{
                                            display: "inline-block",
                                            borderBottom: "1px solid lightgray",
                                            borderRight: "1px solid lightgray",
                                            width: "100%",
                                            textAlign: "center",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => alert("Add event!")}
                                    >
                                        <span
                                            style={{
                                                color: day.year === today.getFullYear() && day.month === today.getMonth() && day.date === today.getDate()
                                                    ? "white"
                                                    : day.month === selectedMonth
                                                        ? "black"
                                                        : "lightgray",
                                                marginLeft: "10px",
                                                paddingLeft: day.date < 10 ? 7 : 3,
                                                paddingRight: day.date < 10 ? 7 : 4,
                                                paddingBottom: 1,
                                                borderRadius: "50%",
                                                backgroundColor: day.year === today.getFullYear() && day.month === today.getMonth() && day.date === today.getDate()
                                                    ? "rgb(25,103,210)"
                                                    : ""
                                            }}
                                        >
                                            { day.date }
                                        </span>
                                    </div>
                                ))
                            }
                            {
                                events
                                    .filter(x => getNumberOfCommonDays(x, week[0], week[6]) > 0)
                                    .map((x, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                position: "absolute",
                                                marginTop: 30 + index * 30,
                                                marginLeft: getMarginLeftForEvent(x.startAt, week[0]),
                                                width: getEventWidth(getNumberOfCommonDays(x, week[0], week[6])),
                                                height: "25px",
                                                background: x.color ? x.color : "rgb(3, 155, 229)",
                                                cursor: "pointer",
                                                boxShadow: "0px 1px 1px 0px rgba(60,64,67,0.3)",
                                                borderRadius: "3px"
                                            }}
                                            className="cell-dev"
                                            onClick={() => alert('Edit event!')}
                                        >
                                            <span style={{
                                                marginLeft: 10,
                                                marginRight: 10,
                                                color: "rgb(255,255,255)",
                                                fontWeight: "bolder",
                                                fontSize: "small",
                                                cursor: "pointer",
                                                display: "inline-block"
                                            }}>
                                                {x.name}
                                            </span>
                                        </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </Fragment>
    );
}

export default Events;