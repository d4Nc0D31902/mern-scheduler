import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { myAppointments, clearErrors } from "../../actions/appointmentActions";

const MyAppointment = () => {
  const dispatch = useDispatch();
  const { loading, error, appointments } = useSelector(
    (state) => state.myAppointments
  );

  useEffect(() => {
    dispatch(myAppointments());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setAppointmentsData = () => {
    const data = {
      columns: [
        {
          label: "Appointment ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Attendees",
          field: "attendees",
          sort: "asc",
        },
        {
          label: "Title",
          field: "title",
          sort: "asc",
        },
        {
          label: "Location",
          field: "location",
          sort: "asc",
        },
        {
          label: "Start Time",
          field: "startTime",
          sort: "asc",
        },
        {
          label: "End Time",
          field: "endTime",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Reason of Status",
          field: "reason",
          sort: "asc",
        },
        {
          label: "Key ID",
          field: "key",
          sort: "asc",
        },
      ],
      rows: [],
    };

    appointments.forEach((appointment) => {
      let statusColor;
      switch (appointment.status) {
        case "Approved":
          statusColor = "green";
          break;
        case "Denied":
          statusColor = "red";
          break;
        case "Pending":
          statusColor = "orange";
          break;
        default:
          statusColor = "black";
      }

      const attendeesList = appointment.attendees.map((attendee, index) => (
        <li key={index}>{attendee}</li>
      ));

      data.rows.push({
        id: appointment._id,
        attendees: <ul>{attendeesList}</ul>,
        title: appointment.title,
        location: appointment.location,
        startTime: new Date(appointment.timeStart).toLocaleString(),
        endTime: new Date(appointment.timeEnd).toLocaleString(),
        status: <p style={{ color: statusColor }}>{appointment.status}</p>,
        reason: appointment.reason,
        key: appointment.key,
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"My Appointments"} />

      <h1 className="my-5">My Appointments</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setAppointmentsData()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default MyAppointment;
