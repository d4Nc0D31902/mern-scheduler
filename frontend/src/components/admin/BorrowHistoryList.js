import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { allBorrows, clearErrors } from "../../actions/borrowActions";
import axios from "axios";

const BorrowList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, borrows } = useSelector((state) => state.allBorrows);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    console.log("Fetching borrows...");
    dispatch(allBorrows());

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    console.log("Borrows updated:", borrows);
  }, [borrows]);

  console.log("Loading:", loading);
  console.log("Error:", error);

  const filteredBorrows = () => {
    if (selectedStatus === "All") {
      return borrows.borrowings;
    }
    return borrows.borrowings.filter(
      (borrow) => borrow.status === selectedStatus
    );
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "orange";
      case "Denied":
        return "red";
      case "Borrowed":
        return "orange";
      case "Returned":
        return "green";
      default:
        return "";
    }
  };

  const setBorrows = () => {
    const data = {
      columns: [
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Borrow Date",
          field: "borrowDate",
          sort: "asc",
        },
        {
          label: "Return Date",
          field: "returnDate",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Action By",
          field: "by",
          sort: "asc",
        },
        {
          label: "Created At",
          field: "createdAt",
          sort: "asc",
        },
      ],
      rows: [],
    };

    // Populate rows with borrow history
    if (borrows && borrows.borrowings && borrows.borrowings.length > 0) {
      filteredBorrows().forEach((borrow) => {
        borrow.history.forEach((historyLog) => {
          data.rows.push({
            user: borrow.user,
            numofItems: historyLog.borrowItems.length,
            borrowDate: new Date(historyLog.date_borrow).toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              }
            ),
            returnDate: historyLog.date_return
              ? new Date(historyLog.date_return).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "N/A",
            status: (
              <span style={{ color: getStatusColor(historyLog.status) }}>
                {historyLog.status}
              </span>
            ),
            by: historyLog.by,
            createdAt: new Date(borrow.createdAt).toLocaleString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Borrow Logs"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">Borrow Logs</h1>
            <div className="mb-3">
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select
                id="statusFilter"
                className="form-control"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="All">All</option>
                <option value="Approved">Approved</option>
                <option value="Denied">Denied</option>
                <option value="Pending">Pending</option>
                <option value="Borrowed">Borrowed</option>
                <option value="Returned">Returned</option>
              </select>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setBorrows()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default BorrowList;
