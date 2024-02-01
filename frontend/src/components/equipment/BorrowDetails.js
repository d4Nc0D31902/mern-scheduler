import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getBorrowDetails, clearErrors } from "../../actions/borrowActions";

const BorrowDetails = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    borrow = {},
  } = useSelector((state) => state.borrowDetails);
  const {
    borrowingInfo = {},
    borrowItems = [],
    user = "",
    date_return,
    issue = "",
    status = "",
    reason_status = "",
  } = borrow;

  let { id } = useParams();

  useEffect(() => {
    dispatch(getBorrowDetails(id));
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  const formatBorrowDateTime = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formattedDateTime = new Date(date).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDateTime;
  };

  const borrowingDetails =
    borrowingInfo &&
    `${formatBorrowDateTime(borrowingInfo.date_borrow)} - ${
      borrowingInfo.reason_borrow
    }`;

  console.log("Borrowing Info:", borrowingInfo); // Log borrowingInfo to check its value

  return (
    <Fragment>
      <MetaData title={"Borrow Details"} />

      {loading ? (
        <Loader />
      ) : borrow && borrowingInfo ? (
        <div className="row" style={{ marginTop: "30px" }}>
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
            <h4 className="my-4 text-center">BORROWING INFORMATION</h4>

            <div className="cart-item my-1">
              {borrowItems.length > 0 &&
                borrowItems.map((item) => (
                  <div key={item._id} className="row my-5">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>

                    <div className="col-5 col-lg-5">
                      <Link to={`/product/${item.equipment}`}>{item.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
            </div>
            <h4 className="mb-4 text-center">BORROW DETAILS</h4>

            <p>
              <b>Borrower:</b> {user}
            </p>

            <p className="mb-4">
              <b>Borrowing Info:</b> {borrowingDetails || "N/A"}
            </p>

            <p>
              <b>Date Return:</b>{" "}
              {date_return ? date_return : "Not returned yet"}
            </p>

            <p>
              <b>Issue:</b> {issue}
            </p>

            <p>
              <b>Status:</b> {status}
            </p>

            <p>
              <b>Reason Status:</b> {reason_status}
            </p>
          </div>
        </div>
      ) : (
        <p>No borrow details available.</p>
      )}
    </Fragment>
  );
};

export default BorrowDetails;
