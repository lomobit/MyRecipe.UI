import './index.css';
import {Fragment, useState} from "react";
import {Button, FormControl, IconButton, MenuItem, Select, Stack} from '@mui/material';
import * as React from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Calendar from "./calendar";

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
        startAt: new Date(2023, 11, 21),
        finishAt: new Date(2023, 11, 23),
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
        name: "Вижай",
        startAt: new Date(2023, 11, 26),
        finishAt: new Date(2023, 11, 30)
    },
    {
        name: "Сплав6",
        startAt: new Date(2023, 11, 9),
        finishAt: new Date(2023, 11, 15),
        color: "rgb(191,201,19)"
    },
];

const Events = () => {
    const today = new Date();

    const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());


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
    }

    const onGotoTodayClick = () => {
        let nextMonth = today.getMonth();
        let nextYear = today.getFullYear();

        setSelectedMonth(nextMonth);
        setSelectedYear(nextYear);
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
                        </Select>
                    </FormControl>
                </Stack>
            </div>

            <Calendar
                events={events}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
            />
            
        </Fragment>
    );
}

export default Events;