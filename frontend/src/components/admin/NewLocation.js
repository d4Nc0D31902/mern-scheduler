import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newLocation, clearErrors } from "../../actions/locationActions";
import { NEW_LOCATION_RESET } from "../../constants/locationConstants";

const NewLocation = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newLocation);

  const navigate = useNavigate();
  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/locations");
      message("Location created successfully");
      dispatch({ type: NEW_LOCATION_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const locationData = {
      name,
    };

    dispatch(newLocation(locationData))
      .then(() => {
        // This block will execute if the dispatch is successful
        navigate("/admin/locations");
        message("Location created successfully");
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error creating location:", error);
      });
  };

  return (
    <Fragment>
      <MetaData title={"New Location"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">New Location</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewLocation;
