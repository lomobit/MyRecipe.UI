import * as React from "react";

declare interface CalendarDay {
    date: number;
    month: number;
    year: number;
}

declare interface CalendarEvent {
    name: string;
    startAt: Date;
    finishAt: Date;
    color?: string;
}

declare interface CalendarEventModel extends CalendarEvent {
    topMarginIndex: number;
}

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
    const daysPerWeek = 7;
    const weeksToShow = 6;

    let firstDayOfMonthIndex = new Date(year, month, 1).getDay();

    let result: CalendarDay[][] = [];
    let tempWeek: CalendarDay[] = [];

    for (let i = 0; i < daysPerWeek * weeksToShow; i++) {
        let tempDate = new Date(year, month, i + firstDayCooficient - firstDayOfMonthIndex);
        tempWeek.push({
            date: tempDate.getDate(),
            month: tempDate.getMonth(),
            year: tempDate.getFullYear()
        });
    }

    for (let i = 0; i < weeksToShow; i++) {
        let temp = [];
        for (let j = 0; j < daysPerWeek; j++) {
            temp.push(tempWeek[i * daysPerWeek + j]);
        }
        result.push(temp);
    }

    return result;
}

export declare interface CalendarProps {
    events: Array<CalendarEvent>,
    selectedMonth: number,
    selectedYear: number,

    onAddEvent: () => void,
    onEditEvent: (name: string) => void,
}

const Calendar = (props: CalendarProps) => {
    const today = new Date();

    const cellWidth = 107;
    const eventWidth = 100;

    const getNumberOfCommonDays = (event: CalendarEvent, week: Array<CalendarDay>) => {
        let start1 = event.startAt;
        let end1 = event.finishAt;
        let start2 = new Date(week[0].year, week[0].month, week[0].date);
        let end2 = new Date(week[6].year, week[6].month, week[6].date);

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

    const getMarginLeftForEvent = (startAt: Date, startWeek: CalendarDay) => {
        let startWeekDate = new Date(startWeek.year, startWeek.month, startWeek.date);
        if (startWeekDate >= startAt) return 0;

        return (new Date(startAt.getTime() - startWeekDate.getTime()).getDate() - 1) * cellWidth;
    }

    const getMarginTop = (index: number) => {
        return index * 30;
    }

    const sortByStartDate = (a: CalendarEvent, b: CalendarEvent) => {
        return a.startAt.getTime() - b.startAt.getTime();
    }

    const getOrderedEvents = (events: Array<CalendarEvent>, week: Array<CalendarDay>) => {
        const maxEventsPerDay = 3;

        let filteredEvents = events
            .filter(x => getNumberOfCommonDays(x, week) > 0)
            .sort(sortByStartDate);
        let result: Array<CalendarEventModel> = [];

        for (let i = 1; i <= maxEventsPerDay; i++) {
            let currentEndDate = new Date(-8640000000000000);
            for (let j = 0; j < filteredEvents.length; j++) {
                if (filteredEvents[j].startAt > currentEndDate) {
                    result.push({
                        ...filteredEvents[j],
                        topMarginIndex: i,
                    });

                    currentEndDate = filteredEvents[j].finishAt;
                    filteredEvents.splice(j, 1);
                    j--;
                }
            }
        }

        return result;
    }

    return (
        <div className="mainCalendarGrid" style={{height: "120px", marginTop: "20px"}}>
            {
                getCurrentMonth(props.selectedMonth, props.selectedYear).map((week, index) => (
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
                                    onClick={props.onAddEvent}
                                >
                                    <span
                                        style={{
                                            color: day.year === today.getFullYear() && day.month === today.getMonth() && day.date === today.getDate()
                                                ? "white"
                                                : day.month === props.selectedMonth
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
                                        {day.date}
                                    </span>
                                </div>
                            ))
                        }
                        {
                            getOrderedEvents(props.events, week)
                                .map((x, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            position: "absolute",
                                            marginTop: getMarginTop(x.topMarginIndex),
                                            marginLeft: getMarginLeftForEvent(x.startAt, week[0]),
                                            width: getEventWidth(getNumberOfCommonDays(x, week)),
                                            height: "25px",
                                            background: x.color ? x.color : "rgb(3, 155, 229)",
                                            cursor: "pointer",
                                            boxShadow: "0px 1px 1px 0px rgba(60,64,67,0.3)",
                                            borderRadius: "3px"
                                        }}
                                        className="cell-dev"
                                        onClick={() => props.onEditEvent(x.name)}
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
    );
}

export default Calendar;