import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allEquipments,
  clearErrors,
  deactivateEquipment,
  reactivateEquipment,
} from "../../actions/equipmentActions";
import {
  DEACTIVATE_EQUIPMENT_RESET,
  REACTIVATE_EQUIPMENT_RESET,
} from "../../constants/equipmentConstants";

const EquipmentsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, equipments } = useSelector(
    (state) => state.allEquipments
  );
  const { isDeactivated, isReactivated } =
    useSelector((state) => state.equipment) || {};
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(allEquipments());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeactivated) {
      successMsg("Equipment deactivated successfully");
      console.log("Equipment deactivated:", isDeactivated);
      dispatch({ type: DEACTIVATE_EQUIPMENT_RESET });
    }
    if (isReactivated) {
      successMsg("Equipment reactivated successfully");
      console.log("Equipment reactivated:", isReactivated);
      dispatch({ type: REACTIVATE_EQUIPMENT_RESET });
    }
  }, [dispatch, error, isDeactivated, isReactivated]);

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
      case "Deducted":
        return "red";
      default:
        return "";
    }
  };

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
      rows: [],
    };

    if (equipments && equipments.length > 0) {
      equipments.forEach((equipment) => {
        equipment.stockHistory
          .filter(
            (historyEntry) =>
              historyEntry.status === "Borrowed" ||
              historyEntry.status === "Returned" ||
              historyEntry.status === "Restocked" ||
              historyEntry.status === "Deducted" 
          )
          .forEach((historyEntry) => {
            data.rows.push({
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
            });
          });
      });
    } else {
      console.log("Equipments data is empty or undefined.");
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Stock History"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="my-5">Stock History</h1>
              {/* <Link to="/admin/equipment" className="btn btn-primary">
                Back to Equipments
              </Link> */}
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
