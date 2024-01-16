import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateEquipment,
  getEquipmentDetails,
  clearErrors,
} from "../../actions/equipmentActions";
import { UPDATE_EQUIPMENT_RESET } from "../../constants/equipmentConstants";

const UpdateEquipment = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sport, setSport] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const { error, equipment } = useSelector((state) => state.equipmentDetails);
  const equipmentState = useSelector((state) => state.equipment);
  const loading = equipmentState ? equipmentState.loading : false;
  const updateError = equipmentState ? equipmentState.error : null;
  const isUpdated = equipmentState ? equipmentState.isUpdated : false;
  const { id } = useParams();
  const navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (!equipment || equipment._id !== id) {
      dispatch(getEquipmentDetails(id));
    } else {
      setName(equipment.name);
      setDescription(equipment.description);
      setSport(equipment.sport);
      setStock(equipment.stock);
      // Assume images array structure is similar to UpdateAppointment.js
      setImages(equipment.images || []);
      setImagesPreview(equipment.imagesPreview || []);
      setOldImages(equipment.images);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/equipments");
      successMsg("Equipment updated successfully");
      dispatch({ type: UPDATE_EQUIPMENT_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, equipment, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedEquipment = {
      name,
      description,
      sport,
      stock,
      images,
    };
    dispatch(updateEquipment(equipment._id, updatedEquipment));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title={"Update Equipment"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form
              className="shadow-lg"
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <h1 className="mb-4">Update Equipment</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="sport_field">Sport</label>
                {/* Use your logic to fetch sports and set the options */}
                {/* Replace options with actual sports fetched */}
                <select
                  id="sport_field"
                  className="form-control"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                >
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                  <option value="tennis">Tennis</option>
                  {/* Add more options as needed */}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <div className="input-group">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setStock(stock - 1 >= 0 ? stock - 1 : 0)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-control"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setStock(stock + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Images</label>
                <div className="custom-file">
                  <input
                    type="file"
                    name="images"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                    multiple
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>

                {oldImages &&
                  oldImages.map((img) => (
                    <img
                      key={img.public_id}
                      src={img.url}
                      alt={img.url}
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}

                {imagesPreview.map((img, index) => (
                  <img
                    src={img}
                    key={index}
                    alt="Images Preview"
                    className="mt-3 mr-2"
                    width="55"
                    height="52"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-block py-3"
                disabled={loading ? true : false}
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateEquipment;
