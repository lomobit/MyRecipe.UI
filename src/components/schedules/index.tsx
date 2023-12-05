import './index.css';
import {Fragment, useState} from "react";
import {Button, FormControl, IconButton, MenuItem, Select, Stack} from '@mui/material';
import * as React from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';import AddIcon from "@mui/icons-material/Add";


const Events = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    const currentPeriod = [
        [{ month: 11, date: 27 }, { month: 11, date: 28 }, { month: 11, date: 29 }, { month: 11, date: 30 }, { month: 12, date: 1 }, { month: 12, date: 2 }, { month: 12, date: 3 } ],
        [{ month: 12, date: 4 }, { month: 12, date: 5 }, { month: 12, date: 6 }, { month: 12, date: 7 }, { month: 12, date: 8 }, { month: 12, date: 9 }, { month: 12, date: 10 }],
        [{ month: 12, date: 11 }, { month: 12, date: 12 }, { month: 12, date: 13 }, { month: 12, date: 14 }, { month: 12, date: 15 }, { month: 12, date: 16 }, { month: 12, date: 17 }],
        [{ month: 12, date: 18 }, { month: 12, date: 19 }, { month: 12, date: 20 }, { month: 12, date: 21 }, { month: 12, date: 22 }, { month: 12, date: 23 }, { month: 12, date: 24 }],
        [{ month: 12, date: 25 }, { month: 12, date: 26 }, { month: 12, date: 27 }, { month: 12, date: 28 }, { month: 12, date: 29 }, { month: 12, date: 30 }, { month: 12, date: 31 }]
    ];

    const events = [
        {
            name: "Сплав1",
            startAt: new Date(2023, 10, 26),
            finishAt: new Date(2023, 10, 28)
        },
        {
            name: "Сплав2",
            startAt: new Date(2023, 11, 4),
            finishAt: new Date(2023, 11, 6)
        },
        {
            name: "Сплав3",
            startAt: new Date(2023, 11, 5),
            finishAt: new Date(2023, 11, 7)
        },
        {
            name: "Сплав4",
            startAt: new Date(2023, 11, 23),
            finishAt: new Date(2023, 11, 26)
        },
        {
            name: "Сплав5",
            startAt: new Date(2023, 11, 30),
            finishAt: new Date(2024, 0, 2)
        },
        {
            name: "Сплав6",
            startAt: new Date(2023, 11, 8),
            finishAt: new Date(2023, 11, 20)
        },
    ];

    const cellWidth = 107;
    const eventWidth = 100;

    const getNumberOfCommonDays = (event: any, firstItem: any, lastItem: any) => {
        debugger;

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

    return (
        <Fragment>
            <h1>События</h1>

            <div className="eventsButtons">
                <Stack direction="row" spacing={1} className="changePeriodButtons">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => alert("Вернулся на сегодлняшний день в календаре")}
                    >
                        Сегодня
                    </Button>
                    <IconButton
                        aria-label="previousDatePeriod"
                        color="default"
                        onClick={() => alert('test2')}
                    >
                        <ArrowBackIosNewIcon
                            fontSize='small'/>
                    </IconButton>
                    <IconButton
                        aria-label="nextDatePeriod"
                        color="default"
                        onClick={() => alert('test3')}
                    >
                        <ArrowForwardIosIcon
                            fontSize='small' />
                    </IconButton>
                    <h2 style={{ color: "dimgray" }}>
                        {"Декабрь"} {2024}
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
                    currentPeriod.map((week, index) => (
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
                                                color: day.month == currentDate.getMonth() + 1 ? "black" : "lightgray",
                                                marginLeft: "10px"
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
                                                background: "rgb(3, 155, 229)",
                                                cursor: "pointer",
                                                boxShadow: "0px 1px 1px 0px rgba(60,64,67,0.3)",
                                                borderRadius: "3px"
                                            }}
                                            className="cell-dev"
                                            onClick={() => alert('Edit event!')}
                                        >
                                            <span style={{
                                                marginLeft: 10,
                                                color: "rgb(255,255,255)",
                                                fontWeight: "bolder",
                                                fontSize: "small",
                                                cursor: "pointer"
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