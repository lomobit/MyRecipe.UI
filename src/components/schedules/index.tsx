import './index.css';
import {Fragment, useEffect, useState} from "react";
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
        startAt: new Date(2023, 11, 8),
        finishAt: new Date(2023, 11, 20),
        color: "rgb(191,201,19)"
    },
];

const getCurrentMonth = (month: number, year: number) => {
    const timeOfOneDay = 1000*60*60*24;

    let firstDayOfMonth = new Date(year, month, 1);
    let firstDay = firstDayOfMonth.getDay(); // 0 is Sunday

    let lastDayOfPreviousMonth = new Date(firstDayOfMonth.getTime() - timeOfOneDay);

    let result: CalendarDay[][] = [];
    let tempWeek: CalendarDay[] = [];

    // первая неделя
    for (let i = 0; i < firstDay; i++) {
        let tempObj: CalendarDay = {
            date: lastDayOfPreviousMonth.getDate() - lastDayOfPreviousMonth.getDay() + i,
            month: lastDayOfPreviousMonth.getMonth(),
            year: lastDayOfPreviousMonth.getFullYear()
        };
        tempWeek.push(tempObj);
    }

    for (let i = firstDay; i < 7; i++) {
        let tempObj: CalendarDay = {
            date: firstDayOfMonth.getDate() - firstDay + i,
            month: firstDayOfMonth.getMonth(),
            year: firstDayOfMonth.getFullYear()
        };
        tempWeek.push(tempObj);
    }

    result.push(tempWeek);
    tempWeek = [];

    // 3 недели посередине
    for (let i = 0; i < 3; i++) {
        for (let j = result[i][6].date + 1; j < result[i][6].date + 8; j++) {
            let tempObj: CalendarDay = {
                date: j,
                month: firstDayOfMonth.getMonth(),
                year: firstDayOfMonth.getFullYear()
            };
            tempWeek.push(tempObj);
        }
        result.push(tempWeek);
        tempWeek = [];
    }

    // последняя неделя
    let numberOfDaysInTheMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0).getDate()
    for (let i = result[3][6].date + 1; i < numberOfDaysInTheMonth; i++) {
        let tempObj: CalendarDay = {
            date: i,
            month: firstDayOfMonth.getMonth(),
            year: firstDayOfMonth.getFullYear()
        };
        tempWeek.push(tempObj);
    }

    let lastIndex = 8 - tempWeek.length;
    for (let i = 1; i < lastIndex; i++) {
        let tempObj: CalendarDay = {
            date: i,
            month: firstDayOfMonth.getMonth() + 1,
            year: firstDayOfMonth.getFullYear()
        };
        tempWeek.push(tempObj);
    }

    result.push(tempWeek);
    tempWeek = [];

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
        let start2 = new Date(2023, firstItem.month - 1, firstItem.date);
        let end2 = new Date(2023, lastItem.month - 1, lastItem.date);

        if (end1 < start2 || end2 < start1) {
            return 0;
        }

        const commonStart = start1 < start2 ? start2 : start1;
        const commonEnd = end1 < end2 ? end1 : end2;
        const commonDays = Math.ceil((commonEnd.getTime() - commonStart.getTime()) / (1000 * 60 * 60 * 24));

        return commonDays;
    }

    const getEventWidth = (cellsCount: number) => {
        return (cellWidth * (cellsCount)) + eventWidth;
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
                    //currentPeriod.map((week, index) => (
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
                                                color: day.month == today.getMonth() && day.date == today.getDate()
                                                    ? "white"
                                                    : day.month == selectedMonth
                                                        ? "black"
                                                        : "lightgray",
                                                marginLeft: "10px",
                                                paddingLeft: day.date < 10 ? 7 : 3,
                                                paddingRight: day.date < 10 ? 7 : 4,
                                                paddingBottom: 1,
                                                borderRadius: "50%",
                                                backgroundColor: day.month == today.getMonth() && day.date == today.getDate()
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
                                                marginLeft: (x.startAt.getDate() - week[0].date >= 0 ? x.startAt.getDate() - week[0].date : 0) * cellWidth,
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