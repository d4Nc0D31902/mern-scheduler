import React, { Fragment, useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { allEquipments, clearErrors } from "../../actions/equipmentActions";
import {
  DEACTIVATE_EQUIPMENT_RESET,
  REACTIVATE_EQUIPMENT_RESET,
} from "../../constants/equipmentConstants";

const EquipmentsList = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispatch = useDispatch();
  const { loading, error, equipments } = useSelector(
    (state) => state.allEquipments
  );

  useEffect(() => {
    dispatch(allEquipments());
    if (error) {
      toast.error(error, { position: toast.POSITION.BOTTOM_CENTER });
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

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
      case "Restocked":
        return "green";
      default:
        return "";
    }
  };

  const filteredEquipments = equipments.filter((equipment) => {
    const historyStatus = equipment.stockHistory.reduce(
      (acc, curr) => acc || curr.status === selectedStatus,
      false
    );
    return selectedStatus === "" || historyStatus;
  });

  const setEquipments = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Quantity",
          field: "quantity",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Witnessed By",
          field: "by",
          sort: "asc",
        },
        {
          label: "Created At",
          field: "createdAt",
          sort: "asc",
        },
      ],
      rows: filteredEquipments.flatMap((equipment) =>
        equipment.stockHistory
          .filter(
            (historyEntry) =>
              selectedStatus === "" || historyEntry.status === selectedStatus
          )
          .map((historyEntry) => ({
            name: historyEntry.name,
            quantity: historyEntry.quantity,
            status: (
              <span style={{ color: getStatusColor(historyEntry.status) }}>
                {historyEntry.status}
              </span>
            ),
            by: historyEntry.by,
            createdAt: new Date(historyEntry.createdAt).toLocaleString(
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
          }))
      ),
    };

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Equipment Stock History"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
        <Fragment>
            <h1 className="my-5">All Borrowings</h1>
            <div className="mb-3">
              <label htmlFor="statusFilter">Filter by Status:</label>
              <select
                id="statusFilter"
                className="form-control"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="">All</option>
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
                data={setEquipments()}
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

export default EquipmentsList;
