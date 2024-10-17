import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./BookingCalendar.css";

const BookingCalendar = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const sampleBookings = [
      {
        id: 1,
        title: "Soccer - Field 1",
        start: "2024-04-28T10:00:00",
        end: "2024-04-28T12:00:00",
        user: "John Doe",
      },
      {
        id: 2,
        title: "Basketball - Court 2",
        start: "2024-04-28T13:00:00",
        end: "2024-04-28T15:00:00",
        user: "Jane Smith",
      },
      // Add more bookings as needed
    ];
    setBookings(sampleBookings);
  }, []);

  const handleDateClick = (arg) => {
    console.log("Date clicked:", arg.dateStr);
  };

  const handleEventClick = (clickInfo) => {
    alert(
      `Booking Details:\n\nGame: ${clickInfo.event.title}\nUser: ${
        clickInfo.event.extendedProps.user
      }\nTime: ${clickInfo.event.start.toLocaleString()} - ${clickInfo.event.end.toLocaleString()}`
    );
  };

  return (
    <div className="max-h-[600px] overflow-y-auto">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek" // Default view
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={bookings}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
        editable={false} // Set to true if you want to allow drag-and-drop
        height="auto"
      />
    </div>
  );
};

export default BookingCalendar;
