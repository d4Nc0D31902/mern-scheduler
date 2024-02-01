import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBorrowDetails,
  updateBorrow,
  clearErrors,
} from "../../actions/borrowActions";
import { UPDATE_BORROW_RESET } from "../../constants/borrowConstants";

const BorrowDetails = () => {
  const [status, setStatus] = useState("");
  const [issue, setIssue] = useState("");
  const [reasonStatus, setReasonStatus] = useState("");
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();

  // Retrieve past input from local storage on component mount
  useEffect(() => {
    const storedStatus = localStorage.getItem("status");
    const storedIssue = localStorage.getItem("issue");
    const storedReasonStatus = localStorage.getItem("reasonStatus");

    setStatus(storedStatus || "");
    setIssue(storedIssue || "");
    setReasonStatus(storedReasonStatus || "");
  }, []);

  const {
    loading,
    borrow = {},
    error = null,
  } = useSelector((state) => state.borrowDetails);
  const { borrow: borrowState = {} } = useSelector((state) => state);
  const { isUpdated = false } = borrowState;

  const borrowId = id;

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(getBorrowDetails(borrowId));
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      successMsg("Borrow updated successfully");
      dispatch({ type: UPDATE_BORROW_RESET });
    }
  }, [dispatch, error, isUpdated, borrowId]);

  // Update local storage with current input values
  useEffect(() => {
    localStorage.setItem("status", status);
    localStorage.setItem("issue", issue);
    localStorage.setItem("reasonStatus", reasonStatus);
  }, [status, issue, reasonStatus]);

  const updateBorrowHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);
    formData.set("issue", issue);
    formData.set("reason_status", reasonStatus);
    dispatch(updateBorrow(id, formData))
      .then(() => {
        // Redirect to "admin/borrows" after updating
        navigate("/admin/borrows");
        // Display success toast message
        toast.success("Borrow updated successfully");
      })
      .catch((error) => {
        // Display error toast message
        toast.error(error.message || "Failed to update borrow");
      });
  };

  const borrowItems = borrow && borrow.borrowItems ? borrow.borrowItems : [];
  const borrowingInfo =
    borrow && borrow.borrowingInfo ? borrow.borrowingInfo : {};
  const { user = "", date_return, status: orderStatus } = borrow;

  const borrowingDetails =
    borrowingInfo &&
    `${new Date(borrowingInfo.date_borrow).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })} - ${borrowingInfo.reason_borrow}`;

  return (
    <Fragment>
      <MetaData title={`Borrow Details # ${borrow && borrow._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row">
                <div className="col-12 col-lg-7 borrow-details">
                  <h3
                    className="card-title"
                    style={{
                      fontFamily: "sans-serif",
                      textAlign: "center",
                      marginBottom: "10px",
                      margin: "20px",
                      backgroundColor: "maroon",
                      color: "white",
                      padding: "20px",
                    }}
                  >
                    <img
                      src="/images/tupt_logo.png"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginRight: "25px",
                      }}
                      alt="Logo"
                    />
                    TECHNOLOGICAL UNIVERSITY OF THE PHILIPPINES
                  </h3>
                  <h4 className="my-4 text-center">BORROW DETAILS</h4>
                  <div
                    className="cart-item my-1"
                    style={{ backgroundColor: "" }}
                  >
                    {borrowItems &&
                      borrowItems.map((item) => (
                        <div key={item._id} className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                            <hr />
                          </div>
                          <div className="col-5 col-lg-5">
                            <Link to={`/product/${item.equipment}`}>
                              {item.name}
                            </Link>
                          </div>
                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <h4 className="mb-4 text-center">BORROWING INFORMATION</h4>
                  <p>
                    <b>Borrower:</b> {user}
                  </p>
                  <p className="mb-4">
                    <b>Borrowing Info:</b> {borrowingDetails || "N/A"}
                  </p>
                  <p>
                    <b>Date Return:</b>{" "}
                    {date_return
                      ? new Date(date_return).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Not returned yet"}
                  </p>
                  <div>
                    <b>Issue:</b>{" "}
                    <div
                      className="form-group"
                      style={{ display: "inline-block" }}
                    >
                      <select
                        value={issue}
                        onChange={(e) => setIssue(e.target.value)}
                      >
                        <option value="N/A">N/A</option>
                        <option value="Damage">Damage</option>
                        <option value="Missing">Missing</option>
                        <option value="Incorrect Equipment">
                          Incorrect Equipment
                        </option>
                        <option value="Dirty or Unhygienic Equipment">
                          Dirty or Unhygienic Equipment
                        </option>
                        <option value="Incomplete Sets">Incomplete Sets</option>
                        <option value="Incorrect Use or Mishandling">
                          Incorrect Use or Mishandling
                        </option>
                        <option value="Stolen or Unreturned Items">
                          Stolen or Unreturned Items
                        </option>
                        <option value="Overdue">Overdue</option>
                      </select>
                    </div>
                  </div>
                  <p>
                    <b>Status:</b> {orderStatus}
                  </p>
                  <div>
                    <b>Reason Status:</b>{" "}
                    <div
                      className="form-group"
                      style={{ display: "inline-block" }}
                    >
                      <select
                        value={reasonStatus}
                        onChange={(e) => setReasonStatus(e.target.value)}
                      >
                        <option value="N/A">N/A</option>
                        <option value="Reason 1">Reason 1</option>
                        <option value="Reason 2">Reason 2</option>
                        {/* Add other reason options */}
                      </select>
                    </div>
                  </div>
                  <hr />
                  <h4
                    className="my-4 text-center"
                    style={{ marginBottom: "200px" }}
                  >
                    Status
                  </h4>
                  <div className="form-group" style={{ marginBottom: "" }}>
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Denied">Denied</option>
                      <option value="Borrowed">Borrowed</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => updateBorrowHandler(borrow._id)}
                    style={{ marginBottom: "200px" }}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default BorrowDetails;
