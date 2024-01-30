import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allSports,
  clearErrors,
  deleteSport,
} from "../../actions/sportActions";
import { DELETE_SPORT_RESET } from "../../constants/sportConstants";

const SportsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, sports } = useSelector((state) => state.allSports);
  const { isDeleted } = useSelector((state) => state.sport) || {};
  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    dispatch(allSports());
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      successMsg("Sport deleted successfully");
      navigate("/admin/sports");
      dispatch({ type: DELETE_SPORT_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteSportHandler = (id) => {
    dispatch(deleteSport(id));
  };

  const setSports = () => {
    const data = {
      columns: [
        // {
        //   label: "Sport ID",
        //   field: "id",
        //   sort: "asc",
        // },
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

    if (sports) {
      sports.forEach((sport) => {
        data.rows.push({
          // id: sport._id,
          name: sport.name,
          actions: (
            <Fragment>
              <Link
                to={`/admin/sport/${sport._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              {/* <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteSportHandler(sport._id)}
              >
                <i className="fa fa-trash"></i>
              </button> */}
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"All Sports"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="my-5">All Sports</h1>
              <Link to="/admin/sport" className="btn btn-primary">
                Create Sport
              </Link>
            </div>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setSports()}
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

export default SportsList;
