import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSettings,
  getSettings,
  clearSettingsErrors,
} from "../../actions/settingsActions";

const SettingsComponent = () => {
  const dispatch = useDispatch();
  const { settings, loading, error } = useSelector((state) => state.settings);

  const [formData, setFormData] = useState({
    days: {
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    },
    morning_schedule: ["", ""],
    afternoon_schedule: ["", ""],
  });

  const [morningTime, setMorningTime] = useState(["", ""]);
  const [afternoonTime, setAfternoonTime] = useState(["", ""]);

  const formatTime = (time) => {
    // Ensure time is in HH:mm format (24-hour clock)
    return time ? time.slice(0, 5) : ""; // Extract only HH:mm part
  };

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings._id) {
      const { day_schedule, morning_schedule, afternoon_schedule } = settings;

      const updatedFormData = {
        days: {
          Sunday: day_schedule.includes("Sunday"),
          Monday: day_schedule.includes("Monday"),
          Tuesday: day_schedule.includes("Tuesday"),
          Wednesday: day_schedule.includes("Wednesday"),
          Thursday: day_schedule.includes("Thursday"),
          Friday: day_schedule.includes("Friday"),
          Saturday: day_schedule.includes("Saturday"),
        },
        morning_schedule: morning_schedule || ["", ""],
        afternoon_schedule: afternoon_schedule || ["", ""],
      };

      setFormData(updatedFormData);

      setMorningTime([
        formatTime(updatedFormData.morning_schedule[0]),
        formatTime(updatedFormData.morning_schedule[1]),
      ]);

      setAfternoonTime([
        formatTime(updatedFormData.afternoon_schedule[0]),
        formatTime(updatedFormData.afternoon_schedule[1]),
      ]);
    }
  }, [settings]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      days: {
        ...prevData.days,
        [name]: checked,
      },
    }));
  };

  const handleTimeInputChange = (e, index, scheduleType) => {
    const { value } = e.target;

    const updatedSchedule = [...formData[scheduleType]];
    updatedSchedule[index] = value;

    setFormData({
      ...formData,
      [scheduleType]: updatedSchedule,
    });

    // Update the state for time pickers
    if (scheduleType === "morning_schedule") {
      setMorningTime(updatedSchedule);
    } else if (scheduleType === "afternoon_schedule") {
      setAfternoonTime(updatedSchedule);
    }
  };

  const handleUpdateSettings = (e) => {
    e.preventDefault();

    const selectedDays = Object.keys(formData.days).filter(
      (day) => formData.days[day]
    );
    const updatedSettings = {
      day_schedule: selectedDays,
      morning_schedule: formData.morning_schedule,
      afternoon_schedule: formData.afternoon_schedule,
    };
    dispatch(updateSettings(updatedSettings));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <MetaData title={"Update Settings"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form className="shadow-lg" onSubmit={handleUpdateSettings}>
              <h1 className="mb-4">Update Settings</h1>
              <div>
                <div>
                  {Object.entries(formData.days).map(([day, isChecked]) => (
                    <div key={day}>
                      <label>
                        <input
                          type="checkbox"
                          name={day}
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
                <div>
                  <label>Morning Schedule:</label>
                  <input
                    type="time"
                    className="form-control"
                    value={morningTime[0] || ""}
                    onChange={(e) =>
                      handleTimeInputChange(e, 0, "morning_schedule")
                    }
                  />
                  <span>to</span>
                  <input
                    type="time"
                    className="form-control"
                    value={morningTime[1] || ""}
                    onChange={(e) =>
                      handleTimeInputChange(e, 1, "morning_schedule")
                    }
                  />
                </div>
                <div>
                  <label>Afternoon Schedule:</label>
                  <input
                    type="time"
                    className="form-control"
                    value={afternoonTime[0] || ""}
                    onChange={(e) =>
                      handleTimeInputChange(e, 0, "afternoon_schedule")
                    }
                  />
                  <span>to</span>
                  <input
                    type="time"
                    className="form-control"
                    value={afternoonTime[1] || ""}
                    onChange={(e) =>
                      handleTimeInputChange(e, 1, "afternoon_schedule")
                    }
                  />
                </div>

                <button
                  id="update_settings_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  UPDATE SETTINGS
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsComponent;
