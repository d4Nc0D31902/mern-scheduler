import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  allEquipments,
  clearErrors,
  deleteEquipment,
} from "../../actions/equipmentActions";
import { DELETE_EQUIPMENT_RESET } from "../../constants/equipmentConstants";

const EquipmentsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, equipments } = useSelector(
    (state) => state.allEquipments
  );
  const { isDeleted } = useSelector((state) => state.equipment) || {};
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
    if (isDeleted) {
      successMsg("Equipment deleted successfully");
      navigate("/admin/equipments");
      dispatch({ type: DELETE_EQUIPMENT_RESET });
    }
  }, [dispatch, error, navigate, isDeleted]);

  const deleteEquipmentHandler = (id) => {
    dispatch(deleteEquipment(id));
  };

  const setEquipments = () => {
    const data = {
      columns: [
        {
          label: "Equipment ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Description",
          field: "description",
          sort: "asc",
        },
        {
          label: "Sport",
          field: "sport",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Images",
          field: "images",
          sort: "asc",
        },
        {
          label: "Created At",
          field: "createdAt",
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

    if (equipments) {
      equipments.forEach((equipment) => {
        const imageElements = equipment.images.map((image) => (
          <img
            key={image.public_id}
            src={image.url}
            alt={`Equipment ${equipment._id}`}
            style={{ width: "50px", height: "50px" }}
          />
        ));

        data.rows.push({
          id: equipment._id,
          name: equipment.name,
          description: equipment.description,
          sport: equipment.sport,
          stock: equipment.stock,
          images: imageElements,
          createdAt: new Date(equipment.createdAt).toLocaleString(),
          actions: (
            <Fragment>
              <Link
                to={`/admin/equipment/${equipment._id}`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteEquipmentHandler(equipment._id)}
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
      <MetaData title={"All Equipments"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="my-5">All Equipments</h1>
              <Link to="/admin/equipment" className="btn btn-primary">
                Create Equipment
              </Link>
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
