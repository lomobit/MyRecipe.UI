import './index.css';
import React, { useState } from 'react';

interface Event {
    id: number;
    title: string;
    start: Date;
    finish: Date;
}

const defaultEvent: Event = { id: 0, title: '', start: new Date(), finish: new Date() };

function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [newEvent, setNewEvent] = useState<Event | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleDayClick = (date: Date) => {
        setNewEvent({
            ...defaultEvent,
            id: Date.now(),
            start: date,
            finish: date,
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (newEvent) {
            setNewEvent((prevEvent) => {
                if (!prevEvent) {
                    return prevEvent; // Handle the case where prevEvent is null
                }

                return {
                    ...prevEvent,
                    [e.target.name]: e.target.name === 'start' || e.target.name === 'finish'
                        ? new Date(e.target.value)
                        : e.target.value,
                };
            });
        }
    };

    const handleSaveEvent = () => {
        if (newEvent) {
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            setNewEvent(null);
        }
    };

    const handleEventClick = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleDialogClose = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="calendar-container">
            {Array.from({ length: 4 }).map((_, weekIndex) => (
                <div key={weekIndex} className="week">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                        const date = new Date();
                        date.setDate(1 + weekIndex * 7 + dayIndex);

                        const dayEvents = events.filter(
                            (event) =>
                                event.start.getDate() === date.getDate() &&
                                event.start.getMonth() === date.getMonth()
                        );

                        return (
                            <div
                                key={dayIndex}
                                className={`day ${dayEvents.length > 0 ? 'event-day' : ''}`}
                                onClick={() => handleDayClick(date)}
                            >
                                {dayEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="event-indicator"
                                        onClick={() => handleEventClick(event)}
                                    ></div>
                                ))}
                                {date.getDate()}
                            </div>
                        );
                    })}
                </div>
            ))}

            {newEvent && (
                <div className="event-form">
                    <h2>Create Event</h2>
                    <label>
                        Event Title:
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Start Date and Time:
                        <input
                            type="datetime-local"
                            name="start"
                            value={newEvent.start.toISOString().slice(0, -8)}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Finish Date and Time:
                        <input
                            type="datetime-local"
                            name="finish"
                            value={newEvent.finish.toISOString().slice(0, -8)}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={handleSaveEvent}>Save Event</button>
                </div>
            )}

            {selectedEvent && (
                <div className="event-dialog">
                    <h2>Event Details</h2>
                    <p>Title: {selectedEvent.title}</p>
                    <p>Start: {selectedEvent.start.toLocaleString()}</p>
                    <p>Finish: {selectedEvent.finish.toLocaleString()}</p>
                    <button onClick={handleDialogClose}>Close</button>
                </div>
            )}
        </div>
    );
}

export default Events;