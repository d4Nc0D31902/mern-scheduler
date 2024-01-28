import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Your Profile"} />
          <div
            className="profilePic"
            style={{
              marginTop: "50px",
              // borderStyle: "solid",
              // borderWidth: "2px",
              backgroundColor: "",
            }}
          >
            <div className="row" style={{ marginTop: "50px" }}>
              <div className="col-lg-3 col-md-2 mb-4">
                {/* <div className="card" style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}> */}
                <div className="card-body text-center">
                  <img
                    className=" img-fluid"
                    style={{
                      width: "100%",
                      height: "250px",
                      borderStyle: "solid",
                      borderWidth: "2px",
                      color: "black",
                    }}
                    src={user.avatar.url}
                    alt={user.name}
                  />
                  <hr
                    style={{
                      borderStyle: "solid",
                      borderWidth: "2px",
                    }}
                  />
                  <Link
                    to="/me/update"
                    id="edit_profile"
                    className="btn btn-primary btn-block"
                  >
                    EDIT PROFILE
                  </Link>

                  <Link
                    to="/password/update"
                    className="btn btn-primary btn-block "
                  >
                    CHANGE PASSWORD
                  </Link>
                </div>
              </div>
              <div className="col-lg-8 col-md-10 col-sm-12 mb-4">
                {/* <div className="card" style={{ boxShadow: "1px 2px 8px red", cursor: "pointer" }}> */}
                <div className="card-body ">
                  <div className="row">
                    <div className="col-lg-12">
                      <h5 style={{ fontFamily: "calibri" }}>
                        NAME OF THE USER:
                      </h5>
                      <p style={{ fontSize: "18px" }}>{user.name}</p>
                      <hr
                        style={{ borderStyle: "solid", borderWidth: "2px" }}
                      />{" "}
                      {/* Horizontal line */}
                    </div>
                    <div className="col-lg-12">
                      <h5 style={{ fontFamily: "calibri" }}>EMAIL ADDRESS:</h5>
                      <p style={{ fontSize: "18px" }}>{user.email}</p>
                      <hr
                        style={{ borderStyle: "solid", borderWidth: "2px" }}
                      />{" "}
                      {/* Horizontal line */}
                    </div>
                    <div className="col-lg-12">
                      <h5 style={{ fontFamily: "calibri" }}>JOINED ON:</h5>
                      <p style={{ fontSize: "18px" }}>
                        {String(user.createdAt).substring(0, 10)}
                      </p>
                      <hr
                        style={{ borderStyle: "solid", borderWidth: "2px" }}
                      />{" "}
                      {/* Horizontal line */}
                    </div>
                  </div>

                  <h5 style={{ fontFamily: "calibri" }}>DEPARTMENT:</h5>
                  <p style={{ fontSize: "18px" }}>{user.department}</p>
                  <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />

                  <h5 style={{ fontFamily: "calibri" }}>COURSE:</h5>
                  <p style={{ fontSize: "18px" }}>{user.course}</p>
                  <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />

                  <h5 style={{ fontFamily: "calibri" }}>YEAR:</h5>
                  <p style={{ fontSize: "18px" }}>{user.year}</p>
                  <hr style={{ borderStyle: "solid", borderWidth: "2px" }} />

                  {user.role !== "admin" && (
                    <Link to="/orders/me" className="btn btn-primary btn-block">
                      My Orders
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <MetaData title={"Your Profile"} />

       

          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user.name}
                />
              </figure>

              <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-block my-5"
              >
                Edit Profile
              </Link>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Department</h4>
              <p>{user.department}</p>

              <h4>Course</h4>
              <p>{user.course}</p>

              <h4>Year</h4>
              <p>{user.year}</p>

              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-primary btn-block mt-3"
              >
                Change Password
              </Link>
            </div>
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
