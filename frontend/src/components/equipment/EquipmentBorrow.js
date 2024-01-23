import React, { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newBorrow, clearErrors } from "../../actions/borrowActions";
import { NEW_BORROW_RESET } from "../../constants/borrowConstants";

const EquipmentBorrow = () => {
  const [equipment, setEquipment] = useState({ name: "" });
  const [quantity, setQuantity] = useState(1);
  const [reasonBorrow, setReasonBorrow] = useState("");
  const [dateBorrow, setDateBorrow] = useState(formatDate(new Date()));

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newBorrow);

  const navigate = useNavigate();
  const location = useLocation();
  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    const stateEquipment = location.state?.equipment || { name: "" };
    const stateStock = location.state?.stock || 1;

    setEquipment(stateEquipment);
    setQuantity(stateStock);
  }, [location.state]);

  function formatDate(date) {
    const isoString = date.toISOString();
    return isoString.slice(0, isoString.length - 8); // Remove seconds and milliseconds
  }

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/borrows");
      message("Borrow created successfully");
      dispatch({ type: NEW_BORROW_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const borrowData = {
      equipment: equipment.name,
      quantity,
      reason_borrow: reasonBorrow,
      date_borrow: dateBorrow,
      reason_status: "N/A", // Replace with the actual reason_status value
    };

    dispatch(newBorrow(borrowData));
  };

  return (
    <Fragment>
      <MetaData title={"New Borrow"} />
      <div className="row">
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Borrowing Form</h1>
                <div className="form-group">
                  <label htmlFor="equipment_field">Equipment</label>
                  <input
                    type="text"
                    id="equipment_field"
                    className="form-control"
                    value={equipment.name}
                    onChange={(e) => setEquipment({ name: e.target.value })}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity_field">Quantity</label>
                  <input
                    type="number"
                    id="quantity_field"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reason_borrow_field">Reason for Borrow</label>
                  <textarea
                    id="reason_borrow_field"
                    className="form-control"
                    value={reasonBorrow}
                    onChange={(e) => setReasonBorrow(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date_borrow_field">Date of Borrow</label>
                  <input
                    type="datetime-local"
                    id="date_borrow_field"
                    className="form-control"
                    value={dateBorrow}
                    onChange={(e) => setDateBorrow(e.target.value)}
                  />
                </div>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default EquipmentBorrow;
