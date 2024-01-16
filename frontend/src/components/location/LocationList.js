import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allLocations,
  clearErrors,
  deleteLocation,
} from "../../actions/locationActions";
import { DELETE_LOCATION_RESET } from "../../constants/locationConstants";

const LocationsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, locations } = useSelector(
    (state) => state.allLocations
  );
  const { isDeleted } = useSelector((state) => state.location) || {};
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(allLocations());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Location deleted successfully");
      navigate("/admin/locations");
      dispatch({ type: DELETE_LOCATION_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteLocationHandler = (id) => {
    dispatch(deleteLocation(id));
  };

  const setLocations = () => {
    const data = {
      columns: [
        {
          label: "Location ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
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

    if (locations) {
      locations.forEach((location) => {
        data.rows.push({
          id: location._id,
          name: location.name,
          actions: (
            <Fragment>
              <Link
                to={`/admin/location/${location._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteLocationHandler(location._id)}
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
      <MetaData title={"All Locations"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="my-5">All Locations</h1>
              <Link to="/admin/location" className="btn btn-primary">
                Create Location
              </Link>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setLocations()}
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

export default LocationsList;
