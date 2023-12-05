import './index.css';
import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';

interface Event {
    title: string;
    startDate: Date;
    endDate: Date;
}

function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [openAddEventDialog, setOpenAddEventDialog] = useState(false);
    const [openViewEventDialog, setOpenViewEventDialog] = useState(false);
    const [eventDetails, setEventDetails] = useState<Event>({
        title: '',
        startDate: new Date(),
        endDate: new Date(),
    });
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleOpenAddEventDialog = () => {
        setOpenAddEventDialog(true);
    };

    const handleCloseAddEventDialog = () => {
        setOpenAddEventDialog(false);
    };

    const handleOpenViewEventDialog = (event: Event) => {
        setSelectedEvent(event);
        setOpenViewEventDialog(true);
    };

    const handleCloseViewEventDialog = () => {
        setOpenViewEventDialog(false);
    };

    const handleSaveEvent = () => {
        setEvents([...events, eventDetails]);
        setEventDetails({
            title: '',
            startDate: new Date(),
            endDate: new Date(),
        });
        handleCloseAddEventDialog();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleOpenAddEventDialog}>
                Create Event
            </Button>

            <div className="calendar">
                {/* Render Days of Week */}
                <div className="day-of-week">Sun</div>
                <div className="day-of-week">Mon</div>
                <div className="day-of-week">Tue</div>
                <div className="day-of-week">Wed</div>
                <div className="day-of-week">Thu</div>
                <div className="day-of-week">Fri</div>
                <div className="day-of-week">Sat</div>

                {/* Render Calendar Cells */}
                {[...Array(28)].map((_, index) => {
                    const day = index + 1;
                    const dayEvents = events.filter(
                        (event) =>
                            event.startDate.getDate() <= day &&
                            day <= event.endDate.getDate()
                    );

                    return (
                        <div
                            key={day}
                            className={`calendar-cell ${dayEvents.length > 0 ? 'has-event' : ''}`}
                            onClick={() => dayEvents.length > 0 && handleOpenViewEventDialog(dayEvents[0])}
                        >
                            <span className="day-label">{day}</span>
                            {dayEvents.map((event) => (
                                <div
                                    key={event.title}
                                    className="event"
                                    style={{
                                        gridColumn: `span ${event.endDate.getDate() - event.startDate.getDate() + 1}`,
                                    }}
                                >
                                    {event.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Add Event Dialog */}
            <Dialog open={openAddEventDialog} onClose={handleCloseAddEventDialog}>
                <DialogTitle>Create Event</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        value={eventDetails.title}
                        onChange={(e) =>
                            setEventDetails({ ...eventDetails, title: e.target.value })
                        }
                        fullWidth
                    />
                    <TextField
                        label="Start Date"
                        type="datetime-local"
                        value={eventDetails.startDate.toISOString().substring(0, 16)}
                        onChange={(e) =>
                            setEventDetails({
                                ...eventDetails,
                                startDate: new Date(e.target.value),
                            })
                        }
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="End Date"
                        type="datetime-local"
                        value={eventDetails.endDate.toISOString().substring(0, 16)}
                        onChange={(e) =>
                            setEventDetails({
                                ...eventDetails,
                                endDate: new Date(e.target.value),
                            })
                        }
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddEventDialog}>Cancel</Button>
                    <Button onClick={handleSaveEvent}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* View Event Dialog */}
            <Dialog open={openViewEventDialog} onClose={handleCloseViewEventDialog}>
                <DialogTitle>
                    {selectedEvent ? selectedEvent.title : 'Event Details'}
                </DialogTitle>
                <DialogContent>
                    {selectedEvent && (
                        <>
                            <TextField
                                label="Title"
                                value={selectedEvent.title}
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="Start Date"
                                value={selectedEvent.startDate.toLocaleString()}
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="End Date"
                                value={selectedEvent.endDate.toLocaleString()}
                                fullWidth
                                disabled
                            />
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseViewEventDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Events;