import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Link } from "react-router-dom";
import "../../Calendar.css";

function MyCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [keyError, setKeyError] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  const isAdmin = isAuthenticated && user.role === "admin";
  const isOfficer = isAuthenticated && user.role === "officer";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/v1/appointments`
        );
        if (response.ok) {
          const data = await response.json();

          const approvedAppointments = data.appointments
            .filter((appointment) => appointment.status === "Approved")
            .map((appointment) => ({
              title: appointment.title,
              start: appointment.timeStart,
              end: appointment.timeEnd,
              id: appointment._id,
              details: {
                ...appointment,
                requester: appointment.requester,
              },
            }));

          setAppointments(approvedAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    };

    fetchData();
  }, []);

  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEventClick = (info) => {
    setSelectedAppointment(info.event.extendedProps.details);
  };

  const handleJoinClick = async () => {
    try {
      if (selectedAppointment) {
        setShowConfirmationModal(true);
      }
    } catch (error) {
      console.error("Error handling join click: ", error);
    }
  };

  const confirmJoinAppointment = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/api/v1/appointment/join/${selectedAppointment._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedAppointment(data.appointment);
        setShowConfirmationModal(false);
        // Force a page reload
        window.location.reload();
      } else {
        console.error("Failed to join appointment: ", response.statusText);
      }
    } catch (error) {
      console.error("Error confirming join appointment: ", error);
    }
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleCloseModal = () => {
    setSelectedAppointment(null);
    setKeyInput("");
    setKeyError("");
  };

  const handleKeyInputChange = (e) => {
    setKeyInput(e.target.value);
  };

  const handleKeySubmit = () => {
    if (selectedAppointment.key === keyInput) {
      setKeyError("");
      handleJoinClick();
    } else {
      setKeyError("Sorry, wrong key");
    }
  };

  const handlePrintCalendar = () => {
    window.print();
  };

  return (
    <div>
      <div className="center-request">
        <Link to="/request">
          <button className="btn btn-primary request">Request Schedule</button>
        </Link>
        <button className="btn btn-primary" onClick={handlePrintCalendar}>
          Print Calendar
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        weekends={true}
        events={appointments}
        eventContent={(eventInfo) => (
          <div className="event-content">
            <div className="event-dot"></div>
            <p className="event-title">{eventInfo.event.title}</p>
          </div>
        )}
        eventClick={handleEventClick}
        eventClassNames="custom-event-dot"
      />

      {selectedAppointment && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedAppointment.title}</h2>
            <p>Requester: {selectedAppointment.requester}</p>
            <p>Location: {selectedAppointment.location}</p>
            <p>Start Time: {formatTime(selectedAppointment.timeStart)}</p>
            <p>End Time: {formatTime(selectedAppointment.timeEnd)}</p>
            <p>Attendees:</p>
            <ul>
              {selectedAppointment.attendees.map((attendee, index) => (
                <li key={index}>{attendee}</li>
              ))}
            </ul>

            {isAuthenticated && (
              <>
                <div className="key-input-container">
                  <label htmlFor="keyInput">Enter Key:</label>
                  <input
                    type="text"
                    id="keyInput"
                    value={keyInput}
                    onChange={handleKeyInputChange}
                  />
                  <button
                    className="btn btn-primary button-join"
                    onClick={handleKeySubmit}
                  >
                    Join
                  </button>
                </div>
                {keyError && <p className="key-error">{keyError}</p>}
              </>
            )}
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="modal active">
          <div className="modal-content">
            <span className="close" onClick={handleCloseConfirmationModal}>
              &times;
            </span>
            <h2>Confirmation</h2>
            <p>Are you sure you want to join this appointment?</p>
            <button
              className="btn btn-primary button-join"
              onClick={confirmJoinAppointment}
            >
              Yes, Join
            </button>
            <button
              className="btn btn-danger button-cancel"
              onClick={handleCloseConfirmationModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
