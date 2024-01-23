import React, { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { myBorrows, clearErrors } from "../../actions/borrowActions";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

const MyBorrow = () => {
  const dispatch = useDispatch();
  const { loading, error, borrows } = useSelector((state) => state.myBorrows);

  useEffect(() => {
    dispatch(myBorrows());
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const setBorrowsData = () => {
    const data = {
      columns: [
        {
          label: "Borrow ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Equipment",
          field: "equipment",
          sort: "asc",
        },
        {
          label: "Quantity",
          field: "quantity",
          sort: "asc",
        },
        {
          label: "Reason for Borrow",
          field: "reason_borrow",
          sort: "asc",
        },
        {
          label: "Borrow Date",
          field: "date_borrow",
          sort: "asc",
        },
        {
          label: "Return Date",
          field: "date_return",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Reason of Status",
          field: "reason_status",
          sort: "asc",
        },
      ],
      rows: [],
    };

    if (
      borrows &&
      borrows.success &&
      Array.isArray(borrows.borrows) &&
      borrows.borrows.length > 0
    ) {
      borrows.borrows.forEach((borrow) => {
        let statusColor;
        switch (borrow.status) {
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

        data.rows.push({
          id: borrow._id,
          user: borrow.user,
          equipment: borrow.equipment,
          quantity: borrow.quantity,
          reason_borrow: borrow.reason_borrow,
          date_borrow: new Date(borrow.date_borrow).toLocaleString(),
          date_return: new Date(borrow.date_return).toLocaleString(),
          status: <p style={{ color: statusColor }}>{borrow.status}</p>,
          reason_status: borrow.reason_status,
        });
      });
    } else {
      console.error("Invalid borrows data:", borrows);
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"My Borrows"} />
      <h1 className="my-5">My Borrows</h1>
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setBorrowsData()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
    </Fragment>
  );
};

export default MyBorrow;
