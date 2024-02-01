import React, { forwardRef } from "react";
import { Link, useParams } from "react-router-dom";

const PrintableBorrowDetails = forwardRef(
  (
    {
      borrow,
      borrowingInfo,
      borrowItems,
      user,
      date_return,
      issue,
      status,
      reason_status,
      borrowingDetails,
    },
    ref
  ) => {
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

    return (
      <div ref={ref}>
        <h3>Borrowing Slip</h3>
        <div>
          {/* Render borrow details here */}

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

          <p>
            <b>Borrower:</b> {user}
          </p>

          <p className="mb-4">
            <b>Borrowing Info:</b> {borrowingDetails || "N/A"}
          </p>

          <p>
            <b>Date Return:</b>{" "}
            {date_return
              ? formatBorrowDateTime(date_return)
              : "Not returned yet"}
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
    );
  }
);

export default PrintableBorrowDetails;
