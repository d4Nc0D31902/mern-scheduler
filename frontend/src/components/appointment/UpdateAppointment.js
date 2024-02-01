import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateAppointment,
  getAppointmentDetails,
  clearErrors,
} from "../../actions/appointmentActions";
import { UPDATE_APPOINTMENT_RESET } from "../../constants/appointmentConstants";

const UpdateAppointment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [key, setKey] = useState("");

  const dispatch = useDispatch();
  const { error, appointment } = useSelector(
    (state) => state.appointmentDetails
  );
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.appointment);
  const { id } = useParams();
  const navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (!appointment || appointment._id !== id) {
      dispatch(getAppointmentDetails(id));
    } else {
      setTitle(appointment.title);
      setDescription(appointment.description);
      setLocation(appointment.location);
      setTimeStart(formatDateTimeLocal(appointment.timeStart));
      setTimeEnd(formatDateTimeLocal(appointment.timeEnd));
      setStatus(appointment.status);
      setAttendees(appointment.attendees || []);
      setReason(appointment.reason);
      setKey(appointment.key);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/appointments");
      successMsg("Appointment updated successfully");
      dispatch({ type: UPDATE_APPOINTMENT_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, appointment, id]);

  const formatDate = (dateTime) => {
    const formattedDate = new Date(dateTime).toISOString().slice(0, 16);
    return formattedDate;
  };

  const formatDateTimeLocal = (dateTime) => {
    const date = new Date(dateTime);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedAppointment = {
      title,
      description,
      location,
      timeStart,
      timeEnd,
      status,
      attendees,
      reason,
      key,
    };
    dispatch(updateAppointment(appointment._id, updatedAppointment));
  };

  const generateRandomKey = () => {
    const randomKey = Math.random().toString(36).substr(2, 6).toUpperCase();
    setKey(randomKey);
  };

  return (
    <Fragment>
      <MetaData title={"Update Appointment"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-4">Update Appointment</h1>

              <div className="form-group">
                <label htmlFor="attendees_field">Attendees</label>
                <ul className="attendees-list">
                  {attendees.map((attendee, index) => (
                    <li key={index}>{attendee}</li>
                  ))}
                </ul>
              </div>

              <div className="form-group">
                <label htmlFor="title_field">Title</label>
                <input
                  type="text"
                  id="title_field"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="body_field">Description</label>
                <textarea
                  className="form-control"
                  id="body_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="location_field">Location</label>
                <input
                  type="text"
                  id="location_field"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeStart_field">Start Time</label>
                <input
                  type="datetime-local"
                  id="timeStart_field"
                  className="form-control"
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeEnd_field">End Time</label>
                <input
                  type="datetime-local"
                  id="timeEnd_field"
                  className="form-control"
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="status_field">Status</label>
                <select
                  id="status_field"
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Denied">Denied</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="reason_field">Reason of Status</label>
                <select
                  id="reason_field"
                  className="form-control"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option value="">Select a reason</option>
                  <option value="Reason 1">Reason 1</option>
                  <option value="Reason 2">Reason 2</option>
                  <option value="Reason 3">Reason 3</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="key_field">Key</label>
                <div className="input-group">
                  <input
                    type="text"
                    id="key_field"
                    className="form-control"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    disabled
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={generateRandomKey}
                    >
                      Generate
                    </button>
                  </div>
                </div>
              </div>

              <button
                id="login_button"
                type="submit"
                className="btn btn-block py-3"
                // disabled={loading ? true : false}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateAppointment;
