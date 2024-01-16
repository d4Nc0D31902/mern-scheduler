import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newSport, clearErrors } from "../../actions/sportActions";
import { NEW_SPORT_RESET } from "../../constants/sportConstants";

const NewSport = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newSport);

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
      navigate("/admin/sports");
      message("Sport created successfully");
      dispatch({ type: NEW_SPORT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const sportData = {
      name,
    };

    dispatch(newSport(sportData));
  };

  return (
    <Fragment>
      <MetaData title={"New Sport"} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">New Sport</h1>

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

export default NewSport;
