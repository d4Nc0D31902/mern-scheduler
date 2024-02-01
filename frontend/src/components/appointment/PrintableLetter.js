import React, { Fragment } from "react";

const PrintableLetter = ({ appointment }) => {
  // Define formatDate function
  const formatDate = (dateTime) => {
    const formattedDate = new Date(dateTime).toISOString().slice(0, 10);
    return formattedDate;
  };

  // Define formatTime function
  const formatTime = (dateTime) => {
    const formattedTime = new Date(dateTime).toLocaleTimeString();
    return formattedTime;
  };

  return (
    <div className="letter">
      <h1>Appointment Letter</h1>
      <p>Date: {formatDate(appointment.timeStart)}</p>
      <p>Dear {appointment.attendees.join(", ")},</p>
      <p>
        We are writing to inform you about your upcoming appointment titled{" "}
        {appointment.title} scheduled on {formatDate(appointment.timeStart)} at{" "}
        {formatTime(appointment.timeStart)}.
      </p>
      <p>Location: {appointment.location}</p>
      <p>
        Please make sure to arrive on time and bring any necessary documents
        with you.
      </p>
      <p>Best regards,</p>
      <p>Your Organization</p>
    </div>
  );
};

export default PrintableLetter;
