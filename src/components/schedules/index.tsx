import './index.css';
import {Fragment, useState} from "react";
import {Button, FormControl, IconButton, MenuItem, Select, Stack} from '@mui/material';
import * as React from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from "@mui/icons-material/Add";

export declare interface EventsProps {
    //currentDate: Date
}

function Events(props: EventsProps) {
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
            startAt: new Date(2023, 11, 26),
            finishAt: new Date(2023, 12, 28)
        },
        {
            name: "Сплав2",
            startAt: new Date(2023, 12, 4),
            finishAt: new Date(2023, 12, 6)
        },
        {
            name: "Сплав3",
            startAt: new Date(2023, 12, 5),
            finishAt: new Date(2023, 12, 7)
        },
        {
            name: "Сплав4",
            startAt: new Date(2023, 12, 23),
            finishAt: new Date(2023, 12, 26)
        },
        {
            name: "Сплав5",
            startAt: new Date(2023, 12, 30),
            finishAt: new Date(2024, 1, 2)
        },
    ];

    const cellWidth = 107;
    const eventWidth = 100;

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
                        //<div style="display: inline-block; border: 1px solid #ccc;">
                        <div style={{
                            display: "flex",
                            position: "relative",
                            height: "100%",
                            minHeight: "40px",
                            borderTop: "1px solid gray",
                            borderLeft: "1px solid gray",
                            textAlign: "justify",
                            justifyContent: "space-between",
                            textAlignLast: "justify"
                        }}>
                            {
                                week.map((day, index) => (
                                    <div style={{
                                        display: "inline-block",
                                        borderBottom: "1px solid gray",
                                        borderRight: "1px solid gray",
                                        width: "100%",
                                        textAlign: "center"
                                    }}>
                                        { day.date }
                                    </div>
                                ))
                            }
                            {
                                events.filter(x => x.startAt.getDate() >= week[0].date || x.finishAt.getDate() <= week[6].date).map((x, index) => (
                                    <div style={{
                                        position: "absolute",
                                        marginTop: 30 + index * 20,
                                        marginLeft: index * cellWidth,
                                        width: eventWidth,
                                        height: "10px",
                                        background: "rgb(3, 155, 229)"
                                    }}>

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