import React, { Fragment, useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Sidebar from "./Sidebar";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";

import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [role, setRole] = useState("");

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { error, isUpdated } = useSelector((state) => state.user);

  const { user } = useSelector((state) => state.userDetails);

  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    // console.log(user && user._id !== userId);

    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);

      setEmail(user.email);

      setRole(user.role);
    }

    if (error) {
      errMsg(error);

      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("User updated successfully");

      navigate("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated, id, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);

    formData.set("email", email);

    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <Fragment>
      <MetaData title={`Update User`} />

      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h3 className="card-title" style={{ fontFamily: "sans-serif", textAlign: "center", marginBottom: "10px", margin: "20px" }}>
                  <img src="/images/tupt_logo.png" style={{ width: "100px", height: "100px", marginRight: "25px" }} alt="Logo" />
                  TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
                </h3>
                <h1 className="mb-4 text-center" style={{ backgroundColor: "maroon", padding: "20px", borderRadius: "20px", color: "white" }}>Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name:</label>

                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email:</label>

                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role:</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">user</option>

                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn update-btn btn-block mt-4 mb-3"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
