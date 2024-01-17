import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allBorrows,
  clearErrors,
  deleteBorrow,
} from "../../actions/borrowActions";
import { DELETE_BORROW_RESET } from "../../constants/borrowConstants";

const BorrowsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, borrows } = useSelector((state) => state.allBorrows);
  const { isDeleted } = useSelector((state) => state.borrow || {});
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    dispatch(allBorrows());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Borrow deleted successfully");
      navigate("/admin/borrows");
      dispatch({ type: DELETE_BORROW_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteBorrowHandler = (id) => {
    dispatch(deleteBorrow(id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "orange";
      case "Denied":
        return "red";
      default:
        return "";
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredBorrows = () => {
    if (selectedStatus === "All") {
      return borrows;
    }
    return borrows.filter((borrow) => borrow.status === selectedStatus);
  };

  const setBorrows = () => {
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
          label: "Reason of Borrow",
          field: "reason_borrow",
          sort: "asc",
        },
        {
          label: "Date Borrowed",
          field: "date_borrow",
          sort: "asc",
        },
        {
          label: "Date Returned",
          field: "date_return",
          sort: "asc",
        },
        {
          label: "Issue",
          field: "issue",
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
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    const filteredData = filteredBorrows();

    if (filteredData) {
      filteredData.forEach((borrow) => {
        const dataReturned = borrow.date_return
          ? new Date(borrow.date_return).toLocaleString()
          : "N/A";

        const statusColor = getStatusColor(borrow.status);

        data.rows.push({
          id: borrow._id,
          user: borrow.user,
          equipment: borrow.equipment,
          quantity: borrow.quantity,
          reason_borrow: borrow.reason_borrow,
          date_borrow: new Date(borrow.date_borrow).toLocaleString(),
          date_return: dataReturned,
          issue: borrow.issue,
          status: <span style={{ color: statusColor }}>{borrow.status}</span>,
          reason_status: borrow.reason_status,
          actions: (
            <Fragment>
              <Link
                to={`/admin/borrow/${borrow._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteBorrowHandler(borrow._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Borrows"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Borrows</h1>
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

export default BorrowsList;
